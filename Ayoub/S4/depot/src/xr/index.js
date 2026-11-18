// Mode VR (WebXR) — point d'entrée appelé par main.js.
//
// Ce fichier vérifie si une session « immersive-vr » est possible (vrai casque ou
// extension Immersive Web Emulator) puis confie le bouton et la session à session.js.

import { isVRSupported } from './support.js';
import { initVRSession } from './session.js';

export async function initXR(app) {
  const slot = document.getElementById('xr-slot');
  app.xr = { supported: false, session: null };
  // WebXR passe par le moteur WebGL 2 (voir src/render/scene.js). Si WebGPU a été imposé
  // par ?backend=webgpu, la VR est annoncée indisponible plutôt que d'échouer à l'entrée.
  app.xr.supported = (await isVRSupported()) && app.render.backend !== 'webgpu';
  initVRSession(app, slot);
}
