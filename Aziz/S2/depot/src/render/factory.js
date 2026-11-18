// Fabrique des équipements 3D (patron Factory) : à partir de l'objet JSON d'un équipement,
// elle retourne le bon modèle. Les modèles GLB sont chargés une fois puis clonés ; si un
// fichier manque, la forme simple de shapes.js prend le relais.

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createShape } from './shapes.js';

const MODEL_FILES = Object.freeze({
  host: 'pc.glb',
  server: 'server.glb',
  switch: 'switch.glb',
  router: 'router.glb',
});

export function createDeviceFactory(baseUrl = new URL('../../assets/models/', import.meta.url)) {
  const loader = new GLTFLoader();
  const models = new Map(); // type -> scène glTF d'origine

  /** Charge tous les modèles ; ne rejette jamais (un échec = forme simple). */
  async function load() {
    await Promise.all(Object.entries(MODEL_FILES).map(async ([type, file]) => {
      try {
        const gltf = await loader.loadAsync(new URL(file, baseUrl).href);
        models.set(type, gltf.scene);
      } catch (error) {
        console.warn(`[rendu] modèle ${file} indisponible, forme simple utilisée.`, error.message || error);
      }
    }));
  }

  /** Objet 3D d'un équipement décrit en JSON ({ type, … }). Le clone partage géométries et matériaux. */
  function create(def) {
    const model = models.get(def.type);
    return model ? model.clone(true) : createShape(def.type);
  }

  return { load, create, has: (type) => models.has(type) };
}
