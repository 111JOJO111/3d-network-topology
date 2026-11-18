# Aziz — S1 : Fondations et contrats (2–8 nov)

**Objectif du sprint.** Mettre en place le dépôt et la scène 3D, et se mettre d'accord sur les formats communs pour que chacun puisse ensuite travailler seul.

**Résultat attendu le dimanche.** Le site s'ouvre sur GitHub Pages et affiche une topologie. Les formats communs (contrats) et leurs mocks sont validés par les quatre. Le moteur de rendu est choisi.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 5 | Créer la scène 3D : caméra, lumière, rotation et zoom à la souris et au doigt. | src/render/ | 3 |
| 6 | Télécharger Three.js (version choisie avec Ayoub) et le placer dans le dépôt pour qu'il marche hors ligne. | vendor/three/ | 1 |
| 7 | Afficher une topologie lue depuis un fichier JSON avec des formes simples (cubes, sphères). | src/render/ | 2 |
| 8 | Écrire l'API de rendu (fonctions que les autres appelleront) et une fausse version (mock) pour tester sans attendre. | src/render/ | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **16 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/api-rendu.md` | nouveau | n° 8 |
| `src/render/api.js` | nouveau | n° 8 |
| `src/render/index.js` | nouveau | n° 7 |
| `src/render/mockRender.js` | nouveau | n° 8 |
| `src/render/scene.js` | nouveau | n° 5 |
| `src/render/shapes.js` | nouveau | n° 7 |
| `tests/render-api.test.js` | nouveau | n° 8 |
| `vendor/three/` (9 fichiers : Three.js r187, OrbitControls, GLTFLoader) | nouveau | n° 6 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

**Première fois :** attends qu'Ayoub ait créé le dépôt et t'ait invité, puis clone-le (`../GUIDE-GITHUB.md`, section 2).

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s1-scene-3d
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S1/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S1\depot\* . -Recurse -Force`

`git status` doit lister exactement les 16 fichiers du tableau ci-dessus (le dossier vendor/ compte pour 9).

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

La pastille en bas à droite de la scène indique « WebGPU » (ou « WebGL 2 » si le navigateur n'a pas WebGPU, ou si un casque ou l'émulateur VR est présent). La scène s'affiche : grille, cubes et cylindres reliés par des traits. Glisser fait tourner la vue, la molette zoome, le clic droit déplace.

### 4. Un commit par tâche

```bash
git add src/render/scene.js
git commit -m "S1 n°5 : scène 3D : caméra, lumières, navigation"

git add vendor
git commit -m "S1 n°6 : Three.js r187 figé dans vendor/"

git add src/render/index.js src/render/shapes.js
git commit -m "S1 n°7 : affichage d'une topologie JSON en formes simples"

git add docs/api-rendu.md src/render/api.js src/render/mockRender.js tests/render-api.test.js
git commit -m "S1 n°8 : API de rendu et mock"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s1-scene-3d
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s1-scene-3d
```

## Ordre de fusion conseillé cette semaine

1. Ayoub  →  2. Khalil  →  3. **Aziz (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Ayoub et Khalil aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **14 tests réussis**.

