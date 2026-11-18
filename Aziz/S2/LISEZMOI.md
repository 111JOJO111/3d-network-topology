# Aziz — S2 : Scène 3D et moteur d'évènements (9–15 nov)

**Objectif du sprint.** Avoir de vrais équipements en 3D et un moteur qui fait avancer la simulation.

**Résultat attendu le dimanche.** Un paquet de test traverse le réseau et obéit à Lecture, Pause, Pas à pas, Vitesse et Réinitialiser.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 20 | Préparer des modèles 3D légers (routeur, switch, PC) au format GLB. | assets/models/ | 3 |
| 21 | Créer factory.js, qui place le bon modèle pour chaque équipement du fichier JSON. | src/render/factory.js | 2 |
| 22 | Dessiner les câbles entre les équipements et les étiquettes (noms, IP). | src/render/links.js, labels.js | 3 |

Total : **8 points**.

## Ce que contient ce dossier

`depot/` — **9 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `assets/models/pc.glb` | nouveau | n° 20 |
| `assets/models/router.glb` | nouveau | n° 20 |
| `assets/models/server.glb` | nouveau | n° 20 |
| `assets/models/switch.glb` | nouveau | n° 20 |
| `src/render/factory.js` | nouveau | n° 21 |
| `src/render/index.js` | modifié | n° 22 |
| `src/render/labels.js` | nouveau | n° 22 |
| `src/render/links.js` | nouveau | n° 22 |
| `tools/make-models.mjs` | nouveau | n° 20 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s2-modeles-cables
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S2/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S2\depot\* . -Recurse -Force`

`git status` doit lister exactement les 9 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Les cubes sont remplacés par les modèles (PC, serveur, switch, routeur), les câbles sont des cylindres, chaque équipement a son étiquette (nom et IP) et chaque port de switch ou de routeur son nom.

### 4. Un commit par tâche

```bash
git add assets/models/pc.glb assets/models/router.glb assets/models/server.glb assets/models/switch.glb tools/make-models.mjs
git commit -m "S2 n°20 : modèles 3D GLB (PC, serveur, switch, routeur)"

git add src/render/factory.js
git commit -m "S2 n°21 : fabrique des équipements 3D (factory.js)"

git add src/render/index.js src/render/labels.js src/render/links.js
git commit -m "S2 n°22 : câbles et étiquettes"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s2-modeles-cables
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s2-modeles-cables
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **30 tests réussis**.

