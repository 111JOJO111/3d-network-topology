// Scène 3D : moteur de rendu, caméra, lumières, sol et navigation.
//
// Moteur (voir docs/choix-moteur-rendu.md) : WebGPURenderer de Three.js.
//   - mode classique : WebGPU quand le navigateur le propose ;
//   - sinon, le même WebGPURenderer bascule seul sur son moteur de secours WebGL 2 ;
//   - en VR aussi, le moteur reste WebGPU (voir src/xr/gpuBridge.js).
// L'adresse peut forcer le choix pour une démonstration : ?backend=webgpu ou ?backend=webgl.
// La navigation (OrbitControls) fonctionne à la souris et au doigt :
//   - glisser : tourner — molette ou pincement : zoomer — clic droit ou deux doigts : déplacer.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const BACKGROUND = 0x0b1220;

/** Une session VR immersive est-elle possible ici (casque ou Immersive Web Emulator) ? */
async function vrPossible() {
  if (!window.isSecureContext || !navigator.xr || !navigator.xr.isSessionSupported) return false;
  try {
    return await navigator.xr.isSessionSupported('immersive-vr');
  } catch {
    return false;
  }
}

/**
 * Faut-il imposer WebGL 2 ? Retourne aussi la raison, affichée dans la console.
 * @returns {Promise<{ forceWebGL: boolean, reason: string }>}
 */
export async function chooseBackend() {
  const asked = new URLSearchParams(window.location.search).get('backend');
  if (asked === 'webgl') return { forceWebGL: true, reason: 'demandé par ?backend=webgl' };
  if (!navigator.gpu) return { forceWebGL: true, reason: 'WebGPU absent de ce navigateur' };
  if (asked === 'webgpu') return { forceWebGL: false, reason: 'demandé par ?backend=webgpu' };
  // Depuis la S7, la VR passe aussi par WebGPU (src/xr/gpuBridge.js) : plus besoin de
  // basculer sur WebGL 2 quand un casque ou un émulateur est présent.
  if (await vrPossible()) return { forceWebGL: false, reason: 'WebGPU disponible, VR comprise' };
  return { forceWebGL: false, reason: 'WebGPU disponible' };
}

/**
 * Compatibilité avec les émulateurs WebXR (Immersive Web Emulator, IWER).
 *
 * Un vrai casque fournit à la session un tampon d'image (framebuffer) qui lui est propre.
 * Un émulateur, lui, dessine dans le canevas de la page : son framebuffer vaut `null`,
 * ce qui désigne en WebGL le tampon par défaut. Le moteur WebGL 2 de Three.js r187 range
 * ses réglages dans une table indexée par framebuffer et n'accepte pas `null` comme clé :
 * sans cette précaution, chaque image d'une session émulée lèverait une erreur.
 * Pour le tampon par défaut il n'y a rien à régler (il dessine déjà dans « BACK ») : on
 * passe donc simplement cet appel. À retirer si une version suivante de Three.js le gère.
 */
function tolerateDefaultFramebuffer(renderer) {
  const state = renderer.backend && renderer.backend.state;
  if (!state || typeof state.drawBuffers !== 'function') return;
  const original = state.drawBuffers.bind(state);
  state.drawBuffers = (renderContext, framebuffer) => {
    if (framebuffer === null || framebuffer === undefined) return;
    original(renderContext, framebuffer);
  };
}

export async function createScene(container) {
  const choice = await chooseBackend();
  const renderer = new THREE.WebGPURenderer({ antialias: true, powerPreference: 'high-performance', forceWebGL: choice.forceWebGL });
  renderer.xr.enabled = true; // la session VR est gérée par src/xr/ ; à activer avant init()
  // init() est asynchrone : il demande la carte graphique. Si WebGPU échoue à ce stade
  // (pilote refusé, par exemple), Three.js retombe de lui-même sur WebGL 2.
  await renderer.init();
  const backend = renderer.backend.isWebGPUBackend === true ? 'webgpu' : 'webgl2';
  if (backend === 'webgl2') tolerateDefaultFramebuffer(renderer);
  console.info(`[rendu] moteur : ${backend === 'webgpu' ? 'WebGPU' : 'WebGL 2'} (${choice.reason})`);
  // Mobile : au-delà de 1,5 le coût en pixels dépasse le gain visuel sur un petit écran.
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.domElement.style.touchAction = 'none';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 400);
  camera.position.set(0, 12, 16);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // ne pas passer sous le sol
  controls.minDistance = 3;
  controls.maxDistance = 80;

  scene.add(new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(6, 14, 8);
  scene.add(sun);

  // Tout ce qui appartient à la topologie vit dans `world` : en VR, on réduit et on
  // déplace ce seul groupe pour poser le réseau devant l'utilisateur.
  const world = new THREE.Group();
  scene.add(world);

  const grid = new THREE.GridHelper(60, 60, 0x2563eb, 0x1e2f4d);
  grid.material.transparent = true;
  grid.material.opacity = 0.55;
  world.add(grid);

  function resize() {
    if (renderer.xr.isPresenting) return; // en VR, la taille est imposée par le casque
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(container);
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', () => setTimeout(resize, 250));
  // Moteur WebGL 2 : si le contexte est perdu (mise en veille d'un mobile), on empêche le
  // navigateur d'abandonner le canevas ; il sera restauré automatiquement.
  renderer.domElement.addEventListener('webglcontextlost', (event) => event.preventDefault());
  resize();

  /** Cadre la caméra sur une boîte englobante (la topologie). */
  function frame(box) {
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.z * 1.6, 8);
    // Écran étroit ou en portrait (téléphone tenu droit) : il faut reculer pour garder
    // toute la largeur, équipements et étiquettes des extrémités compris.
    const narrow = camera.aspect < 1.25 ? 1.25 / camera.aspect : 1;
    const distance = (span + 3) * 0.85 * Math.min(narrow, 2.8);
    controls.target.copy(center);
    camera.position.set(center.x, distance * 0.8, center.z + distance);
    controls.update();
  }

  return { renderer, backend, scene, camera, controls, world, grid, resize, frame };
}
