// Session VR : le bouton « Entrer en VR » et tout ce qui se passe à l'entrée et à la
// sortie du mode immersif.
//
// À l'entrée : la navigation à la souris est suspendue, la scène passe en mode VR et un
// panneau de contrôle 3D apparaît (le HTML n'est pas visible dans le casque).
// À la sortie : tout est remis exactement comme avant.

import { el } from '../ui/dom.js';
import { onLangChange, registerStrings, t } from '../ui/i18n.js';
import { toast } from '../ui/toast.js';
import { createVRPanel } from './vrPanel.js';

registerStrings({
  fr: {
    'xr.enter': 'Entrer en VR', 'xr.exit': 'Quitter la VR',
    'xr.enter.tip': 'Explorer la topologie en réalité virtuelle (casque ou Immersive Web Emulator)',
    'xr.failed': 'Impossible d\'ouvrir la session VR : {message}',
    'xr.unavailable': 'VR indisponible',
    'xr.unavailable.tip': 'Aucun casque ni émulateur WebXR détecté. L\'application reste entièrement utilisable en mode classique. Pour essayer la VR sur PC : installez l\'extension Immersive Web Emulator dans Chrome puis rechargez la page.',
    'xr.fallback': 'La VR n\'est pas disponible sur cet appareil : vous restez en mode classique.',
  },
  en: {
    'xr.enter': 'Enter VR', 'xr.exit': 'Exit VR',
    'xr.enter.tip': 'Explore the topology in virtual reality (headset or Immersive Web Emulator)',
    'xr.failed': 'Could not open the VR session: {message}',
    'xr.unavailable': 'VR unavailable',
    'xr.unavailable.tip': 'No WebXR headset or emulator detected. The app remains fully usable in classic mode. To try VR on a PC: install the Immersive Web Emulator extension in Chrome, then reload the page.',
    'xr.fallback': 'VR is not available on this device: you stay in classic mode.',
  },
});

export function initVRSession(app, slot) {
  const { render } = app;
  const xr = render.renderer ? render.renderer.xr : null;
  const button = el('button', { type: 'button', class: 'btn btn-vr', id: 'vr-button' });
  slot.replaceChildren(button);

  let session = null;
  let panel = null;
  let saved = null; // position de la caméra avant l'entrée en VR

  function refresh() {
    const usable = !!xr && app.xr.supported;
    button.hidden = !usable; // sans WebXR, pas de bouton : le mode classique continue
    button.textContent = t(session ? 'xr.exit' : 'xr.enter');
    button.title = t('xr.enter.tip');
  }

  function onStart() {
    saved = { position: render.camera.position.clone(), quaternion: render.camera.quaternion.clone() };
    render.controls.enabled = false;
    render.setVRMode(true);
    panel = createVRPanel(app, () => session && session.end());
    render.scene.add(panel.object);
    refresh();
  }

  function onEnd() {
    session = null;
    app.xr.session = null;
    if (panel) {
      render.scene.remove(panel.object);
      panel.dispose();
      panel = null;
    }
    render.setVRMode(false);
    if (saved) {
      render.camera.position.copy(saved.position);
      render.camera.quaternion.copy(saved.quaternion);
    }
    render.controls.enabled = true;
    render.controls.update();
    render.resize();
    refresh();
  }

  if (xr) {
    xr.addEventListener('sessionstart', onStart);
    xr.addEventListener('sessionend', onEnd);
  }

  button.addEventListener('click', async () => {
    if (session) { // second clic : sortir
      session.end();
      return;
    }
    try {
      session = await navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor', 'bounded-floor'] });
      app.xr.session = session;
      xr.setReferenceSpaceType('local-floor'); // origine au sol : hauteurs réalistes
      await xr.setSession(session);
    } catch (error) {
      session = null;
      app.xr.session = null;
      toast(t('xr.failed', { message: error.message }), { kind: 'error' });
      refresh();
    }
  });

  onLangChange(refresh);
  refresh();
  return { button };
}
