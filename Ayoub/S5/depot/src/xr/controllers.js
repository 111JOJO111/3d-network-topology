// Manettes VR : un rayon sort de chaque manette ; la gâchette (« select ») actionne le
// bouton du panneau visé ou sélectionne l'équipement ou le paquet visé.
// La sélection réutilise pick() de l'interface (src/ui/selection.js) : la souris, le doigt
// et les manettes partagent donc exactement la même logique.

import * as THREE from 'three';
import { pick } from '../ui/selection.js';

const RAY_LENGTH = 6;

export function initControllers(app, panel) {
  const { render } = app;
  const xr = render.renderer.xr;
  const presenting = () => xr.isPresenting;
  const raycaster = new THREE.Raycaster();
  raycaster.far = 30;
  const rotation = new THREE.Matrix4();

  /** Oriente le rayon selon la manette : origine = sa position, direction = son axe -Z. */
  function aim(controller) {
    rotation.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(rotation);
  }

  /** Ce que vise la manette : un bouton du panneau, ou un objet de la scène. */
  function target(controller) {
    aim(controller);
    const onPanel = panel.intersect(raycaster);
    if (onPanel) return { kind: 'panel', button: onPanel.button, distance: onPanel.distance };
    const hit = pick(render, raycaster);
    return hit ? { kind: 'object', hit, distance: hit.distance } : null;
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
  const hands = [0, 1].map((index) => {
    const controller = xr.getController(index);
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x7dd3fc }));
    line.scale.z = RAY_LENGTH;
    line.raycast = () => {};
    controller.add(line);
    const onSelect = () => {
      const aimed = target(controller);
      if (!aimed) return;
      if (aimed.kind === 'panel') {
        if (aimed.button) panel.press(aimed.button);
      } else if (app.selection) {
        app.selection.select(aimed.hit);
      }
    };
    controller.addEventListener('select', onSelect);
    render.scene.add(controller);
    return { controller, line, onSelect };
  });

  // À chaque image : le rayon s'arrête sur ce qu'il touche et le bouton visé s'éclaire.
  const offFrame = render.onFrame(() => {
    if (!presenting()) return;
    let hovered = null;
    for (const hand of hands) {
      const aimed = target(hand.controller);
      hand.line.scale.z = aimed ? aimed.distance : RAY_LENGTH;
      hand.line.material.color.setHex(aimed ? 0x4ade80 : 0x7dd3fc);
      if (aimed && aimed.kind === 'panel' && aimed.button) hovered = aimed.button;
    }
    panel.hover(hovered);
  });

  return {
    hands,
    dispose() {
      offFrame();
      for (const hand of hands) {
        hand.controller.removeEventListener('select', hand.onSelect);
        hand.controller.remove(hand.line);
        hand.line.material.dispose();
        render.scene.remove(hand.controller);
      }
      lineGeometry.dispose();
    },
  };
}
