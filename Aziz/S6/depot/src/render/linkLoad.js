// Charge des liens (demande du superviseur : débit et bande passante).
//
// Chaque câble prend la couleur de son taux d'utilisation sur les dernières secondes :
// gris au repos, vert, orange au-delà de 50 %, rouge au-delà de 80 %. Il s'épaissit un peu
// quand il est chargé. Une étiquette au milieu donne la vitesse négociée du lien ; elle est
// orange quand un élément (une carte, le câble) bride le lien sous la vitesse des autres.
// Les liens ordinaires à 1 Gb/s n'ont pas d'étiquette, pour ne pas encombrer la scène.
//
// Les couleurs ne dépendent que de sim.traffic(), calculé à partir de l'horloge simulée :
// en pause, l'état reste figé ; après une réinitialisation, tout redevient gris.

import * as THREE from 'three';
import { Topics } from '../sim/events.js';
import { formatSpeed } from '../sim/catalog.js';
import { loadLevel } from '../sim/traffic.js';
import { CABLE_HEIGHT } from './links.js';

export const LOAD_COLORS = Object.freeze({
  idle: 0x64748b,
  low: 0x22c55e,
  busy: 0xf59e0b,
  saturated: 0xef4444,
});
/** Câble coupé : une des deux interfaces est éteinte (shutdown) ou bloquée (err-disabled). */
const DOWN_COLOR = 0x7f1d1d;

/** Le lien est-il coupé ? */
function isDown(sim, link) {
  if (!link) return false;
  return [link.a, link.b].some((end) => {
    const device = end && sim.device(end.device);
    return !!(device && device.isDown && device.isDown(end.iface));
  });
}
/** Fréquence de mise à jour des couleurs (ms réelles) : inutile de recalculer à chaque image. */
const REFRESH = 150;
const idle = new THREE.Color(LOAD_COLORS.idle);
const FLASH_COLOR = 0xd946ef;

export function createLinkLoad(render, sim) {
  const state = new Map(); // id du lien -> { mesh, tag, load, level }
  let elapsed = REFRESH;
  let flashing = { ids: new Set(), left: 0 }; // câbles montrés par le diagnostic

  function speedTag(link, mesh) {
    if (!render.makeLabel || !link) return null;
    const limited = link.limitedBy !== null;
    // On n'affiche que ce qui sort de l'ordinaire : un lien bridé, ou une vitesse autre que 1 Gb/s.
    if (!limited && link.speed === 1000) return null;
    const tag = render.makeLabel([formatSpeed(link.speed)], {
      size: 0.6 * (render.labelSize || 1),
      background: limited ? 'rgba(146, 64, 14, 0.92)' : 'rgba(30, 41, 59, 0.85)',
    });
    if (!tag) return null;
    tag.position.set(mesh.position.x, CABLE_HEIGHT + 0.42, mesh.position.z);
    tag.userData.base = 0.6;
    render.linksLayer.add(tag);
    if (render.linkLabels) render.linkLabels.push(tag);
    return tag;
  }

  function build() {
    state.clear();
    const scenario = sim.scenario;
    if (!scenario) return;
    for (const def of scenario.links || []) {
      const mesh = render.linkObject(def.id);
      if (!mesh) continue;
      const link = sim.link(def.id);
      state.set(def.id, { mesh, tag: speedTag(link, mesh), load: 0, level: 'idle' });
    }
  }

  function paint(entry, load) {
    if (entry.down) {
      entry.load = 0;
      entry.level = 'down';
      entry.mesh.material.color.setHex(DOWN_COLOR);
      if (entry.mesh.material.emissive) entry.mesh.material.emissive.setHex(0x000000);
      entry.mesh.scale.x = entry.mesh.scale.z = 0.6; // câble « mort », plus fin
      return;
    }
    entry.load = load;
    entry.level = loadLevel(load);
    const material = entry.mesh.material;
    if (entry.level === 'idle') material.color.copy(idle);
    else material.color.setHex(LOAD_COLORS[entry.level]);
    if (material.emissive) {
      material.emissive.setHex(entry.level === 'idle' ? 0x000000 : LOAD_COLORS[entry.level]);
      material.emissiveIntensity = 0.15 + 0.5 * load;
    }
    const thickness = 1 + 1.4 * load;
    entry.mesh.scale.x = thickness;
    entry.mesh.scale.z = thickness;
  }

  function refresh() {
    const traffic = sim.traffic();
    for (const [id, entry] of state) entry.down = isDown(sim, sim.link(id));
    for (const [id, entry] of state) paint(entry, traffic && traffic.links[id] ? traffic.links[id].max : 0);
  }

  // Les autres modules (rendu et interface) sont prévenus après la construction de la scène.
  sim.on(Topics.SCENARIO_LOADED, build);
  sim.on(Topics.RESET, () => { for (const entry of state.values()) paint(entry, 0); });
  render.onFrame((dt) => {
    if (flashing.left > 0) {
      flashing.left -= dt;
      const on = flashing.left > 0 && Math.floor(flashing.left / 250) % 2 === 0;
      for (const id of flashing.ids) {
        const entry = state.get(id);
        if (!entry) continue;
        if (on) { entry.mesh.material.color.setHex(FLASH_COLOR); entry.mesh.scale.x = entry.mesh.scale.z = 2.4; } else paint(entry, entry.load);
      }
    }
    elapsed += dt;
    if (elapsed < REFRESH) return;
    elapsed = 0;
    refresh();
  });
  if (sim.scenario) build();

  return {
    /** Charge affichée d'un lien : { load, level }. */
    of(id) {
      const entry = state.get(id);
      return entry ? { load: entry.load, level: entry.level } : { load: 0, level: 'idle' };
    },
    refresh,
    /** Fait clignoter quelques câbles pendant 3 secondes (ex. constat du diagnostic). */
    flash(ids = []) {
      for (const id of flashing.ids) if (state.has(id)) paint(state.get(id), state.get(id).load);
      flashing = { ids: new Set(ids), left: ids.length ? 3000 : 0 };
    },
  };
}
