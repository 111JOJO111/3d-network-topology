// Apparence des paquets : une couleur par protocole, une forme par type de diffusion.
// Ce fichier ne contient que des données (pas de Three.js) : l'interface s'en sert aussi
// pour la légende et le journal, et il se teste sans navigateur.

/** Couleur de chacune des neuf familles de paquets (contraste vérifié sur fond sombre). */
export const PROTOCOL_COLORS = Object.freeze({
  arp: '#f59e0b',  // ambre
  icmp: '#22c55e', // vert
  ip: '#94a3b8',   // gris (paquet IP générique, paquet de test)
  udp: '#06b6d4',  // cyan
  tcp: '#3b82f6',  // bleu
  dns: '#a855f7',  // violet
  dhcp: '#ec4899', // rose
  http: '#ef4444', // rouge
  ipv6: '#14b8a6', // turquoise
});

export const PROTOCOL_NAMES = Object.freeze({
  arp: 'ARP', icmp: 'ICMP', ip: 'IP', udp: 'UDP', tcp: 'TCP', dns: 'DNS', dhcp: 'DHCP', http: 'HTTP', ipv6: 'IPv6',
});

/**
 * Forme selon la diffusion :
 *  - unicast   : une « enveloppe » (boîte) — un seul destinataire ;
 *  - broadcast : une sphère entourée d'un anneau qui pulse — tout le réseau local ;
 *  - multicast : un octaèdre entouré d'un anneau — un groupe de destinataires.
 */
export const CAST_STYLES = Object.freeze({
  unicast: { shape: 'box', halo: false, pulse: false },
  broadcast: { shape: 'sphere', halo: true, pulse: true },
  multicast: { shape: 'octahedron', halo: true, pulse: false },
});

const FALLBACK_COLOR = '#e2e8f0';

export function packetColor(packet) {
  return PROTOCOL_COLORS[packet && packet.protocol] || FALLBACK_COLOR;
}

/** Style complet d'un paquet : { color, shape, halo, pulse }. */
export function packetStyle(packet) {
  const cast = CAST_STYLES[packet && packet.cast] || CAST_STYLES.unicast;
  return { color: packetColor(packet), ...cast };
}

/** Légende : [{ id, name, color }] dans l'ordre d'affichage. */
export function legend() {
  return Object.keys(PROTOCOL_COLORS).map((id) => ({ id, name: PROTOCOL_NAMES[id], color: PROTOCOL_COLORS[id] }));
}
