// Câbles : un cylindre fin tendu entre deux équipements.
// Une seule géométrie et un seul matériau sont partagés par tous les câbles.

import * as THREE from 'three';

export const CABLE_HEIGHT = 0.14;
const RADIUS = 0.05;

let geometry = null;
let material = null;
const UP = new THREE.Vector3(0, 1, 0);

/** Crée le câble entre les positions `a` et `b` (Vector3, coordonnées de la topologie). */
export function createLink(a, b) {
  if (!geometry) {
    geometry = new THREE.CylinderGeometry(RADIUS, RADIUS, 1, 8);
    material = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
  }
  const start = new THREE.Vector3(a.x, CABLE_HEIGHT, a.z);
  const end = new THREE.Vector3(b.x, CABLE_HEIGHT, b.z);
  const direction = end.clone().sub(start);
  // Chaque câble a son propre matériau : sa couleur suit la charge du lien (linkLoad.js).
  const mesh = new THREE.Mesh(geometry, material.clone());
  mesh.scale.y = direction.length();
  mesh.position.copy(start).addScaledVector(direction, 0.5);
  mesh.quaternion.setFromUnitVectors(UP, direction.normalize());
  return mesh;
}

/** Replace un câble existant entre deux nouvelles positions (déplacement dans l'éditeur). */
export function placeLink(mesh, a, b) {
  const start = new THREE.Vector3(a.x, CABLE_HEIGHT, a.z);
  const end = new THREE.Vector3(b.x, CABLE_HEIGHT, b.z);
  const direction = end.clone().sub(start);
  mesh.scale.y = Math.max(0.001, direction.length());
  mesh.position.copy(start).addScaledVector(direction, 0.5);
  if (direction.lengthSq() > 0) mesh.quaternion.setFromUnitVectors(UP, direction.normalize());
}
