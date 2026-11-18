// Démarrage de l'interface : ce fichier lance tous les modules, chacun dans la zone de
// index.html qui lui est réservée. Un module = un fichier = une zone.
//
//   #lang-slot      bouton FR/EN           i18n.js
//   #controls       commandes              controls.js
//   #info           équipement sélectionné infoPanel.js (+ selection.js pour le clic)
//   #xr-slot        bouton VR              réservé à src/xr/

import { Topics } from '../sim/events.js';
import { applyI18n, createLangToggle, localize, onLangChange, registerStrings } from './i18n.js';
import { initControls } from './controls.js';
import { initSelection } from './selection.js';
import { initInfoPanel } from './infoPanel.js';

registerStrings({
  fr: {
    'app.title': '3D Network Topology',
    'scene.hint': 'Glisser : tourner · Molette ou pincement : zoomer · Clic droit ou deux doigts : déplacer',
    'scene.label': 'Scène 3D de la topologie réseau',
  },
  en: {
    'app.title': '3D Network Topology',
    'scene.hint': 'Drag: rotate · Wheel or pinch: zoom · Right-click or two fingers: pan',
    'scene.label': '3D scene of the network topology',
  },
});

/**
 * @param {Object} app  { sim, render, catalog, loadScenario(file) } fourni par main.js
 */
export function initUI(app) {
  createLangToggle(document.getElementById('lang-slot'));

  // En attendant la liste de choix (S4), le titre du scénario chargé est affiché en haut.
  const title = document.getElementById('scenario-slot');
  const showTitle = () => { if (app.sim.scenario) title.textContent = localize(app.sim.scenario.title); };
  app.sim.on(Topics.SCENARIO_LOADED, showTitle);
  onLangChange(showTitle);
  showTitle();

  initSelection(app);
  initControls(app);
  initInfoPanel(app);

  applyI18n(document);
}
