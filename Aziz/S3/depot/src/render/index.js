// Rendu 3D — point d'entrée. initRender() crée la scène et retourne l'API de rendu
// (voir api.js et docs/api-rendu.md), la seule chose que les autres modules utilisent.

import * as THREE from 'three';
import { Topics } from '../sim/events.js';
import { RENDER_API } from './api.js';
import { createMockRender } from './mockRender.js';
import { createScene } from './scene.js';
import { createShape, DEVICE_HEIGHT } from './shapes.js';
import { createDeviceFactory } from './factory.js';
import { createLink, CABLE_HEIGHT } from './links.js';
import { createLabel, updateLabel, resizeLabel } from './labels.js';
import { packetStyle, packetColor, legend } from './packetStyles.js';

export { RENDER_API };

/** Hauteur à laquelle les paquets voyagent au-dessus des câbles. */
const PACKET_HEIGHT = 0.75;
const SELECTION_COLORS = [0x38bdf8, 0x4ade80]; // 1er sélectionné : bleu ; 2e : vert

function showFailure(container, error) {
  const box = document.createElement('p');
  box.className = 'scene-error';
  box.textContent = 'Ni WebGPU ni WebGL 2 ne sont disponibles sur cet appareil : la scène 3D ne peut pas s\'afficher. '
    + 'Neither WebGPU nor WebGL 2 is available on this device: the 3D scene cannot be displayed.';
  container.appendChild(box);
  console.error('[rendu] initialisation impossible', error);
}

/**
 * @param {Object} options
 * @param {HTMLElement} options.container  élément qui reçoit le canevas (#scene)
 * @param {Object} options.sim             simulation (réelle ou mock) : on(), now, device()
 */
export async function initRender({ container, sim }) {
  let stage;
  try {
    stage = await createScene(container);
  } catch (error) {
    showFailure(container, error);
    return createMockRender();
  }
  const { renderer, scene, camera, controls, world } = stage;

  // Pastille discrète dans un coin de la scène : quel moteur dessine l'image.
  const badge = document.createElement('span');
  badge.className = 'backend-badge';
  badge.dataset.backend = stage.backend;
  badge.textContent = stage.backend === 'webgpu' ? 'WebGPU' : 'WebGL 2';
  badge.title = 'Moteur de rendu utilisé / Rendering backend in use';
  container.appendChild(badge);

  const linksLayer = new THREE.Group();
  const devicesLayer = new THREE.Group();
  const packetLayer = new THREE.Group();
  world.add(linksLayer, devicesLayer, packetLayer);

  const devices = new Map(); // id -> { def, object, ring, label }
  const frameCallbacks = new Set();
  const ringGeometry = new THREE.RingGeometry(1.05, 1.25, 40);
  ringGeometry.rotateX(-Math.PI / 2);
  const factory = createDeviceFactory();
  await factory.load();
  let labelSize = 1;
  const linkLabels = [];

  /** Lignes de l'étiquette : le nom, puis l'adresse IP d'un PC ou d'un serveur. */
  function labelLines(def) {
    const live = sim.device && sim.device(def.id);
    const interfaces = live ? live.interfaces : def.interfaces || [];
    const lines = [def.name];
    if (def.type === 'host' || def.type === 'server') {
      const iface = interfaces.find((it) => it.ip);
      lines.push(iface ? `${iface.ip}/${iface.prefix}` : '— (IP ?)');
    }
    return lines;
  }

  function clearLayer(layer) {
    while (layer.children.length) layer.remove(layer.children[0]);
  }

  function showTopology(scenario) {
    clearLayer(linksLayer);
    clearLayer(devicesLayer);
    clearLayer(packetLayer);
    devices.clear();
    linkLabels.length = 0;
    const box = new THREE.Box3();

    for (const def of scenario.devices) {
      const object = factory.create(def);
      object.position.set(def.position[0], def.position[1], def.position[2]);
      object.userData = { kind: 'device', id: def.id };
      const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: SELECTION_COLORS[0], transparent: true, opacity: 0.9 }));
      ring.position.y = 0.03;
      ring.visible = false;
      ring.raycast = () => {};
      object.add(ring);
      const entry = { def, object, ring, label: null };
      entry.label = createLabel(labelLines(def), { size: labelSize });
      entry.label.position.y = (DEVICE_HEIGHT[def.type] || 1) + 0.75;
      object.add(entry.label);
      devicesLayer.add(object);
      devices.set(def.id, entry);
      box.expandByPoint(object.position);
    }

    for (const link of scenario.links || []) {
      const [aId, aPort] = link.a.split(':');
      const [bId, bPort] = link.b.split(':');
      const a = devices.get(aId).object.position;
      const b = devices.get(bId).object.position;
      linksLayer.add(createLink(a, b));
      // Nom du port à chaque extrémité côté switch ou routeur : utile pour lire les tables.
      for (const [id, port, from, to] of [[aId, aPort, a, b], [bId, bPort, b, a]]) {
        const type = devices.get(id).def.type;
        if (type !== 'switch' && type !== 'router') continue;
        const tag = createLabel([port], { size: 0.5 * labelSize, background: 'rgba(30, 41, 59, 0.9)' });
        const along = Math.min(0.32, 1.7 / from.distanceTo(to));
        tag.position.set(from.x + (to.x - from.x) * along, CABLE_HEIGHT + 0.35, from.z + (to.z - from.z) * along);
        tag.userData.base = 0.5;
        linksLayer.add(tag);
        linkLabels.push(tag);
      }
    }

    if (!box.isEmpty()) stage.frame(box);
  }

  function highlight(ids = []) {
    for (const [id, entry] of devices) {
      const rank = ids.indexOf(id);
      entry.ring.visible = rank !== -1;
      if (rank !== -1) entry.ring.material.color.setHex(SELECTION_COLORS[Math.min(rank, 1)]);
    }
  }

  /** Point où un paquet quitte ou atteint un équipement (coordonnées de `world`). */
  function anchor(deviceId) {
    const entry = devices.get(deviceId);
    const position = entry ? entry.object.position : new THREE.Vector3();
    return new THREE.Vector3(position.x, PACKET_HEIGHT, position.z);
  }

  const render = {
    scene,
    camera,
    renderer,
    backend: stage.backend,
    domElement: renderer.domElement,
    controls,
    world,
    packetLayer,
    maxPackets: Infinity,
    showTopology,
    anchor,
    deviceObject: (id) => (devices.has(id) ? devices.get(id).object : null),
    pickables: () => [devicesLayer, packetLayer],
    highlight,
    makeLabel: (lines, options) => createLabel(lines, options),
    packetStyle,
    packetColor,
    legend,
    setVRMode: () => {},
    resize: stage.resize,
    onFrame(callback) {
      frameCallbacks.add(callback);
      return () => frameCallbacks.delete(callback);
    },
    /** Lance la boucle : `tick(dtMs)` fait avancer la simulation, puis l'image est dessinée. */
    start(tick) {
      let last = null;
      // setAnimationLoop (et non requestAnimationFrame) : obligatoire pour que la même
      // boucle continue dans le casque pendant une session WebXR.
      renderer.setAnimationLoop((time) => {
        // Un onglet resté en arrière-plan ne doit pas provoquer un saut de plusieurs secondes.
        const dt = last === null ? 0 : Math.min(time - last, 100);
        last = time;
        if (tick) tick(dt);
        for (const callback of frameCallbacks) callback(dt);
        if (!renderer.xr.isPresenting) controls.update();
        renderer.render(scene, camera);
      });
    },
  };
  for (const name of RENDER_API) {
    if (!(name in render)) throw new Error(`API de rendu incomplète : « ${name} » manque`);
  }

  sim.on(Topics.SCENARIO_LOADED, ({ scenario }) => showTopology(scenario));
  // Une adresse a changé (DHCP) ou tout est réinitialisé : les étiquettes suivent.
  const refreshLabels = () => {
    for (const entry of devices.values()) updateLabel(entry.label, labelLines(entry.def));
  };
  sim.on(Topics.DEVICE_UPDATE, ({ what }) => { if (what === 'ip') refreshLabels(); });
  sim.on(Topics.RESET, refreshLabels);

  // L'animation des paquets est un module à part (packetAnimator.js) : s'il n'est pas
  // encore là, la scène s'affiche quand même.
  try {
    const { createPacketAnimator } = await import('./packetAnimator.js');
    createPacketAnimator(render, sim);
  } catch (error) {
    console.warn('[rendu] animation des paquets indisponible', error.message || error);
  }
  if (sim.scenario) showTopology(sim.scenario);
  return render;
}
