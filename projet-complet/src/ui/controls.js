// Commandes de la simulation : Lecture, Pause, Pas à pas, Vitesse, Réinitialiser.
// Chaque bouton exécute une commande du moteur (patron Command) ; l'état du moteur
// décide quels boutons sont actifs. Raccourcis : Espace, flèche droite, R.

import { Topics } from '../sim/events.js';
import { el } from './dom.js';
import { applyI18n, onLangChange, registerStrings, t } from './i18n.js';

const SPEEDS = [0.25, 0.5, 1, 2, 4];

registerStrings({
  fr: {
    'ctl.play': 'Lecture', 'ctl.pause': 'Pause', 'ctl.step': 'Pas à pas', 'ctl.reset': 'Réinitialiser',
    'ctl.speed': 'Vitesse', 'ctl.time': 'Temps simulé',
    'ctl.play.tip': 'Lecture (Espace)', 'ctl.pause.tip': 'Pause (Espace)',
    'ctl.step.tip': 'Avancer jusqu\'à la prochaine arrivée de paquet (→)', 'ctl.reset.tip': 'Revenir au début (R)',
    'state.ready': 'Prêt', 'state.playing': 'Lecture', 'state.paused': 'En pause', 'state.finished': 'Terminé',
  },
  en: {
    'ctl.play': 'Play', 'ctl.pause': 'Pause', 'ctl.step': 'Step', 'ctl.reset': 'Reset',
    'ctl.speed': 'Speed', 'ctl.time': 'Simulated time',
    'ctl.play.tip': 'Play (Space)', 'ctl.pause.tip': 'Pause (Space)',
    'ctl.step.tip': 'Advance to the next packet arrival (→)', 'ctl.reset.tip': 'Back to the start (R)',
    'state.ready': 'Ready', 'state.playing': 'Playing', 'state.paused': 'Paused', 'state.finished': 'Finished',
  },
});

const ICONS = {
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zM14 5h4v14h-4z',
  step: 'M6 5v14l9-7zM16 5h3v14h-3z',
  reset: 'M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z',
};

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ICONS[name]);
  svg.append(path);
  return svg;
}

export function initControls(app, slot = document.getElementById('controls')) {
  const { sim } = app;

  const button = (name, primary = false) => el('button', {
    type: 'button',
    class: 'btn' + (primary ? ' btn-primary' : ''),
    'data-command': name,
    'data-i18n-title': `ctl.${name}.tip`,
    onclick: () => sim.execute(name),
  }, icon(name), el('span', { 'data-i18n': `ctl.${name}` }));

  const buttons = { play: button('play', true), pause: button('pause'), step: button('step'), reset: button('reset') };
  const speed = el('select', { id: 'speed', onchange: (event) => sim.execute('speed', event.target.value) },
    SPEEDS.map((value) => el('option', { value }, `×${value}`)));
  const badge = el('span', { class: 'state-badge', id: 'sim-state' });
  const clock = el('span', { class: 'clock', id: 'sim-clock', 'data-i18n-title': 'ctl.time' });

  slot.replaceChildren(
    badge,
    el('div', { class: 'btn-group' }, buttons.play, buttons.pause, buttons.step),
    el('label', { class: 'speed' }, el('span', { 'data-i18n': 'ctl.speed' }), speed),
    buttons.reset,
    clock,
  );

  function refresh() {
    for (const [name, element] of Object.entries(buttons)) element.disabled = !sim.can(name);
    badge.textContent = t('state.' + sim.state);
    badge.dataset.state = sim.state;
    speed.value = String(sim.speed);
  }
  let shown = null;
  function refreshClock() {
    const text = (sim.now / 1000).toFixed(1) + ' s';
    if (text !== shown) { clock.textContent = text; shown = text; }
  }

  sim.on(Topics.STATE, refresh);
  sim.on(Topics.SPEED, refresh);
  sim.on(Topics.RESET, refresh);
  sim.on(Topics.SCENARIO_LOADED, refresh);
  sim.on(Topics.CLOCK, refreshClock);
  onLangChange(refresh);

  // Raccourcis clavier, sauf quand l'utilisateur est dans une liste ou un champ.
  window.addEventListener('keydown', (event) => {
    if (event.target.closest && event.target.closest('select, input, textarea, button')) return;
    if (event.code === 'Space') { event.preventDefault(); sim.execute(sim.can('pause') ? 'pause' : 'play'); }
    else if (event.code === 'ArrowRight') { event.preventDefault(); sim.execute('step'); }
    else if (event.key === 'r' || event.key === 'R') sim.execute('reset');
  });

  applyI18n(slot);
  refresh();
  refreshClock();
}
