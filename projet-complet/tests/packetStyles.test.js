import test from 'node:test';
import assert from 'node:assert/strict';
import { PROTOCOL_IDS } from '../src/sim/events.js';
import { PROTOCOL_COLORS, PROTOCOL_NAMES, CAST_STYLES, packetColor, packetStyle, legend } from '../src/render/packetStyles.js';

test('styles : une couleur différente pour chacun des 9 protocoles du contrat', () => {
  assert.deepEqual(Object.keys(PROTOCOL_COLORS).sort(), [...PROTOCOL_IDS].sort());
  const colors = Object.values(PROTOCOL_COLORS);
  assert.equal(new Set(colors).size, 9, 'deux protocoles ne partagent jamais une couleur');
  for (const color of colors) assert.match(color, /^#[0-9a-f]{6}$/);
  for (const id of PROTOCOL_IDS) assert.ok(PROTOCOL_NAMES[id], `nom affiché manquant pour ${id}`);
});

test('styles : la forme distingue unicast, broadcast et multicast', () => {
  const shapes = Object.values(CAST_STYLES).map((style) => style.shape);
  assert.equal(new Set(shapes).size, 3);
  assert.deepEqual(packetStyle({ protocol: 'arp', cast: 'broadcast' }), { color: PROTOCOL_COLORS.arp, shape: 'sphere', halo: true, pulse: true });
  assert.equal(packetStyle({ protocol: 'tcp', cast: 'unicast' }).shape, 'box');
  assert.equal(packetStyle({ protocol: 'tcp' }).shape, 'box', 'sans indication : unicast');
});

test('styles : protocole inconnu = couleur de repli, légende complète', () => {
  assert.match(packetColor({ protocol: 'inconnu' }), /^#[0-9a-f]{6}$/);
  assert.match(packetColor(null), /^#[0-9a-f]{6}$/);
  assert.deepEqual(legend().map((item) => item.id), Object.keys(PROTOCOL_COLORS));
});
