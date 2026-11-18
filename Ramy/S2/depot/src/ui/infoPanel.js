// Panneau d'infos : nom, adresses IP et MAC de l'équipement sélectionné.

import { Topics } from '../sim/events.js';
import { el, panelTitle } from './dom.js';
import { applyI18n, localize, onLangChange, registerStrings, t } from './i18n.js';

registerStrings({
  fr: {
    'info.title': 'Équipement',
    'info.hint': 'Cliquez (ou touchez) un équipement dans la scène pour afficher ses adresses.',
    'info.type.host': 'PC', 'info.type.server': 'Serveur', 'info.type.switch': 'Switch', 'info.type.router': 'Routeur',
    'info.iface': 'Interface', 'info.ip': 'Adresse IP', 'info.mac': 'Adresse MAC',
    'info.noip': 'non configurée', 'info.gateway': 'Passerelle', 'info.dns': 'Serveur DNS',
    'info.ports': 'Ports', 'info.switch': 'Un switch travaille avec les adresses MAC : il n\'a pas d\'adresse IP.',
    'info.empty': 'vide',
    'info.ping': 'Lancer un ping {from} → {to}',
    'info.ping.hint': 'Astuce : sélectionnez un premier hôte puis un second pour lancer un ping entre eux.',
  },
  en: {
    'info.title': 'Device',
    'info.hint': 'Click (or tap) a device in the scene to display its addresses.',
    'info.type.host': 'PC', 'info.type.server': 'Server', 'info.type.switch': 'Switch', 'info.type.router': 'Router',
    'info.iface': 'Interface', 'info.ip': 'IP address', 'info.mac': 'MAC address',
    'info.noip': 'not configured', 'info.gateway': 'Gateway', 'info.dns': 'DNS server',
    'info.ports': 'Ports', 'info.switch': 'A switch works with MAC addresses: it has no IP address.',
    'info.empty': 'empty',
    'info.ping': 'Start a ping {from} → {to}',
    'info.ping.hint': 'Tip: select a first host and then a second one to start a ping between them.',
  },
});

function table(columns, rows) {
  return el('table', { class: 'data' },
    el('thead', {}, el('tr', {}, columns.map((column) => el('th', {}, localize(column))))),
    el('tbody', {}, rows.length
      ? rows.map((row) => el('tr', {}, row.map((cell) => el('td', {}, localize(cell)))))
      : el('tr', {}, el('td', { colspan: columns.length, class: 'muted' }, t('info.empty')))));
}

export function initInfoPanel(app, slot = document.getElementById('info')) {
  const { sim } = app;
  let selected = null; // identifiant de l'équipement affiché
  let previous = null;

  function render() {
    const device = selected && sim.device(selected);
    if (!device) {
      slot.replaceChildren(panelTitle('info.title'), el('p', { class: 'muted', 'data-i18n': 'info.hint' }));
      applyI18n(slot);
      return;
    }
    const children = [
      el('h2', { class: 'panel-title' }, device.name, ' ', el('span', { class: `tag tag-${device.type}` }, t('info.type.' + device.type))),
    ];
    if (device.type === 'switch') {
      children.push(el('p', { class: 'muted' }, t('info.switch')));
      children.push(el('p', {}, el('strong', {}, t('info.ports') + ' : '), device.interfaces.map((iface) => iface.name).join(', ')));
    } else {
      children.push(table(
        [t('info.iface'), t('info.ip'), t('info.mac')],
        device.interfaces.map((iface) => [iface.name, iface.ip ? `${iface.ip}/${iface.prefix}` : t('info.noip'), iface.mac]),
      ));
      const facts = [];
      if (device.gateway) facts.push(el('li', {}, el('strong', {}, t('info.gateway') + ' : '), device.gateway));
      if (device.dnsServer) facts.push(el('li', {}, el('strong', {}, t('info.dns') + ' : '), device.dnsServer));
      if (facts.length) children.push(el('ul', { class: 'facts' }, facts));
    }
    slot.replaceChildren(...children);
  }

  sim.on(Topics.SELECT, (event) => {
    if (event.kind === 'device') { selected = event.id; previous = event.previous || null; }
    else if (event.kind === null) { selected = null; previous = null; }
    else return;
    render();
  });
  sim.on(Topics.DEVICE_UPDATE, (event) => { if (event.device === selected) render(); });
  sim.on(Topics.RESET, render);
  onLangChange(render);
  render();
}
