// Comportement d'un routeur : il relie plusieurs réseaux IP et relaie les paquets
// d'une interface à l'autre.
//
// Routage statique : la table contient les réseaux directement connectés et les routes
// écrites dans le scénario (« routes »: [{ network, prefix, via }]). À chaque passage,
// le TTL diminue de 1 ; à zéro, le paquet est détruit et la source est prévenue par ICMP.
//
// Simplifications pédagogiques : pas de protocole de routage dynamique, pas de
// fragmentation, pas de redirection ICMP.

import { IpNode, texts as hostTexts } from './host.js';
import { note } from '../events.js';

export const texts = {
  ...hostTexts,
  'router.lookup': {
    fr: '{name} consulte sa table de routage : {dst} appartient à {network}/{prefix}, sortie par {iface} ({how}).',
    en: '{name} looks up its routing table: {dst} belongs to {network}/{prefix}, exit through {iface} ({how}).',
  },
  'router.forward': {
    fr: '{name} relaie le paquet : nouvelles adresses MAC (source {srcMac}, destination {dstMac}), adresses IP inchangées.',
    en: '{name} forwards the packet: new MAC addresses (source {srcMac}, destination {dstMac}), IP addresses unchanged.',
  },
  'router.noRoute': {
    fr: '{name} n\'a aucune route vers {dst} : le paquet est détruit.',
    en: '{name} has no route to {dst}: the packet is discarded.',
  },
  'router.ttl': {
    fr: '{name} diminue le TTL de {before} à {after} avant de relayer.',
    en: '{name} decrements the TTL from {before} to {after} before forwarding.',
  },
  'router.ttlExpired': {
    fr: '{name} : le TTL arrive à 0, le paquet est détruit pour éviter qu\'il tourne sans fin. La source est prévenue par un message ICMP « Time Exceeded ».',
    en: '{name}: the TTL reaches 0, the packet is discarded so it cannot loop forever. The source is told with an ICMP "Time Exceeded" message.',
  },
};

export class Router extends IpNode {
  constructor(def, net) {
    super(def, net);
    this.forwarding = true;
    this.staticRoutes = (def.routes || []).map((route) => ({ ...route, iface: null, kind: 'static' }));
  }

  /** Réseaux connectés, puis routes statiques, puis route par défaut. */
  routes() {
    const base = super.routes();
    const connected = base.filter((route) => route.kind === 'connected');
    const fallback = base.filter((route) => route.kind === 'default');
    return [...connected, ...this.staticRoutes, ...fallback];
  }

  /** Relaie un paquet IP qui ne nous est pas destiné. */
  forward(packet, inIface) {
    const dst = packet.ip.dst;
    // Règle métier : un paquet dont le TTL tomberait à 0 n'est jamais relayé.
    if (packet.ip.ttl <= 1) {
      this.net.drop(this, packet, [note('router.ttlExpired', { name: this.name })]);
      const icmp = this.net.registry.get('icmp');
      if (icmp && icmp.error) icmp.error(this, packet, 'ttl', inIface);
      return { accepted: true, notes: [note('router.ttlExpired', { name: this.name })] };
    }
    const hop = this.lookup(dst);
    if (!hop) {
      this.net.drop(this, packet, [note('router.noRoute', { name: this.name, dst })]);
      const icmp = this.net.registry.get('icmp');
      if (icmp && icmp.error) icmp.error(this, packet, 'net', inIface);
      return { accepted: true, notes: [note('router.noRoute', { name: this.name, dst })] };
    }
    const how = hop.route.via
      ? { fr: `prochain saut ${hop.route.via}`, en: `next hop ${hop.route.via}` }
      : { fr: 'réseau directement connecté', en: 'directly connected network' };
    const lookup = note('router.lookup', {
      name: this.name, dst, network: hop.route.network, prefix: hop.route.prefix, iface: hop.iface.name, how,
    });
    const ttl = packet.ip.ttl - 1;
    const notes = [note('router.ttl', { name: this.name, before: packet.ip.ttl, after: ttl })];
    this.output(
      hop,
      (mac) => this.net.clone(packet, { eth: { src: hop.iface.mac, dst: mac, type: 'IPv4' }, ip: { ttl } }),
      (mac) => [lookup, ...notes, note('router.forward', { name: this.name, srcMac: hop.iface.mac, dstMac: mac })],
    );
    return { accepted: true, notes: [lookup] };
  }

  tables() {
    return [
      {
        id: 'routes',
        title: { fr: 'Table de routage', en: 'Routing table' },
        columns: [{ fr: 'Réseau', en: 'Network' }, { fr: 'Prochain saut', en: 'Next hop' }, { fr: 'Interface', en: 'Interface' }],
        rows: this.routeRows(),
      },
      ...super.tables(),
    ];
  }
}

export function create(def, net) {
  return new Router(def, net);
}
