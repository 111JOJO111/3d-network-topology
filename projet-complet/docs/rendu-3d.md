# Le rendu 3D

Le rendu (`src/render/`) dessine la topologie et les paquets avec Three.js r187. Il ne contient aucune logique
réseau : il affiche ce que la simulation publie sur le bus. Son interface publique est décrite dans [api-rendu.md](api-rendu.md).

## Modules

| Fichier | Rôle |
| --- | --- |
| `index.js` | `initRender()` : assemble la scène, affiche une topologie, fournit l'API de rendu |
| `scene.js` | moteur `WebGPURenderer` (WebGPU, secours WebGL 2), caméra, lumières, grille, navigation (OrbitControls), cadrage |
| `factory.js` | fabrique : choisit le modèle GLB de chaque équipement (patron Factory) |
| `shapes.js` | formes simples (cube, cylindre) : S1, puis repli si un modèle manque |
| `links.js` | câbles : cylindres fins |
| `labels.js` | étiquettes : texte dessiné dans un canevas 2D, affiché sur un sprite |
| `packetStyles.js` | couleur par protocole, forme par type de diffusion (données pures, testées) |
| `packetAnimator.js` | déplacement des paquets sur les câbles (Ayoub) |
| `api.js`, `mockRender.js` | liste de l'API et fausse version sans carte graphique |

## Le moteur : WebGPU d'abord

`scene.js` crée un `THREE.WebGPURenderer` et attend son initialisation (`await renderer.init()`), d'où le `await initRender()` de `main.js`.

| Situation | Moteur utilisé | Pastille dans la scène |
| --- | --- | --- |
| navigateur avec WebGPU, pas de casque ni d'émulateur | **WebGPU** | « WebGPU » (verte) |
| navigateur sans WebGPU, ou carte graphique refusée | WebGL 2, secours intégré à `WebGPURenderer` | « WebGL 2 » |
| session VR possible (casque ou Immersive Web Emulator) | WebGL 2, la voie compatible WebXR | « WebGL 2 » |

Le moteur ne peut pas être changé une fois créé : le choix se fait donc au démarrage (`chooseBackend()`).
`?backend=webgpu` ou `?backend=webgl` dans l'adresse l'impose, pour une démonstration. Le code de la scène est le même
dans tous les cas : matériaux, lumières et sprites standard de Three.js, convertis automatiquement par le moteur.
Les raisons de ce choix sont dans [choix-moteur-rendu.md](choix-moteur-rendu.md).

## La scène

- **Repère** : le sol est le plan y = 0 ; les positions viennent du scénario (`"position": [x, y, z]`).
- **Groupe `world`** : toute la topologie (grille, câbles, équipements, paquets) vit dans un seul groupe.
  En VR, il suffit de réduire et de déplacer ce groupe pour poser le réseau devant l'utilisateur.
- **Cadrage** : à l'affichage d'une topologie, la caméra se place pour la voir en entier, en reculant davantage sur un écran étroit ou en portrait.
- **Navigation** : glisser = tourner, molette ou pincement = zoomer, clic droit ou deux doigts = déplacer. La caméra ne passe pas sous le sol.

## Modèles 3D

Quatre modèles au format GLB dans `assets/models/` : `pc.glb`, `server.glb`, `switch.glb`, `router.glb`
(6 à 16 ko chacun). Ils sont **générés par un script**, `tools/make-models.mjs` (`npm run models`) : des boîtes et des
cylindres assemblés, avec leurs matériaux. Avantages : fichiers minuscules, aucune licence tierce, modification en changeant quelques nombres.

Un modèle est chargé une fois puis **cloné** pour chaque équipement ; le clone partage géométries et matériaux.

## Paquets

| Diffusion | Forme | Signification |
| --- | --- | --- |
| unicast | boîte (« enveloppe ») | un seul destinataire |
| broadcast | sphère avec un anneau qui pulse | tout le réseau local |
| multicast | octaèdre avec un anneau | un groupe |

| Protocole | Couleur | | Protocole | Couleur |
| --- | --- | --- | --- | --- |
| ARP | ambre `#f59e0b` | | DNS | violet `#a855f7` |
| ICMP | vert `#22c55e` | | DHCP | rose `#ec4899` |
| IP (test) | gris `#94a3b8` | | HTTP | rouge `#ef4444` |
| UDP | cyan `#06b6d4` | | IPv6 | turquoise `#14b8a6` |
| TCP | bleu `#3b82f6` | | | |

La couleur seule ne porte jamais l'information : chaque paquet a aussi une étiquette avec son nom.

**Animation.** La position d'un paquet est calculée à partir de l'horloge simulée :
`progression = (sim.now − départ) / durée`. En pause les paquets se figent ; à vitesse ×4 ils vont quatre fois plus
vite. Un paquet arrivé reste visible devant son destinataire jusqu'au départ des suivants : après un pas à pas, on peut cliquer dessus pour l'inspecter.

## Performances (mobile)

| Mesure | Où |
| --- | --- |
| géométries et matériaux créés une fois et partagés | `shapes.js`, `links.js`, `packetAnimator.js` |
| modèles clonés, jamais rechargés | `factory.js` |
| densité de pixels plafonnée (1,5 sur écran tactile, 2 ailleurs) | `scene.js` |
| nombre de paquets affichés plafonné (16 sur écran tactile, 48 ailleurs) | `index.js` (`maxPackets`) |
| étiquettes = une texture par étiquette, redessinée seulement si le texte change | `labels.js` |
| horloge de l'image bornée à 100 ms (onglet revenu d'arrière-plan) | `index.js` |

## Lisibilité en VR

`setVRMode(true)` réduit la topologie à 1,8 m de large et la pose à 0,85 m de haut, 1,5 m devant l'utilisateur, comme
une maquette sur une table. La grille est masquée et les étiquettes sont agrandies (× 1,7) pour rester lisibles à un mètre.
À la sortie, tout est remis comme avant.

## Protocoles documentés par Aziz

[ICMP](protocoles/icmp.md) · [UDP](protocoles/udp.md) · [DNS](protocoles/dns.md)
