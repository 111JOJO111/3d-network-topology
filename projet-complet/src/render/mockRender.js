// Fausse version (mock) de l'API de rendu : mêmes fonctions que le vrai rendu, mais sans
// carte graphique. Elle note les appels reçus. Utile pour tester l'interface ou la simulation sans
// carte graphique, et comme repli si ni WebGPU ni WebGL 2 ne sont disponibles.

import { RENDER_API } from './api.js';

export function createMockRender() {
  const calls = [];
  const frameCallbacks = new Set();
  const record = (name) => (...args) => { calls.push({ name, args }); };
  const zero = () => ({ x: 0, y: 0, z: 0, clone() { return zero(); } });

  const render = {
    isMock: true,
    calls,
    scene: null,
    camera: null,
    renderer: null,
    backend: 'mock',
    domElement: null,
    controls: null,
    world: null,
    packetLayer: { add: record('packetLayer.add'), remove: record('packetLayer.remove') },
    maxPackets: Infinity,
    showTopology: record('showTopology'),
    anchor: (id) => { calls.push({ name: 'anchor', args: [id] }); return zero(); },
    deviceObject: () => null,
    pickables: () => [],
    highlight: record('highlight'),
    makeLabel: () => null,
    packetStyle: () => ({ color: '#e2e8f0', shape: 'box', halo: false, pulse: false }),
    packetColor: () => '#e2e8f0',
    legend: () => [],
    setVRMode: record('setVRMode'),
    resize: record('resize'),
    onFrame(callback) { frameCallbacks.add(callback); return () => frameCallbacks.delete(callback); },
    /** Sans boucle d'affichage : appeler step(dtMs) à la main pour simuler une image. */
    start(tick) { render.tick = tick; },
    step(dtMs = 16) {
      if (render.tick) render.tick(dtMs);
      for (const callback of frameCallbacks) callback(dtMs);
    },
  };
  for (const name of RENDER_API) {
    if (!(name in render)) throw new Error(`mockRender : « ${name} » manque`);
  }
  return render;
}
