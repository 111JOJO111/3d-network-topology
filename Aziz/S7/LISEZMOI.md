# Aziz — S7 : Livraison (14–20 déc)

**Objectif du sprint.** Produire la vidéo, finir la documentation et préparer la soutenance. Seuls ajouts : ceux demandés par le superviseur (éditeur de topologie, VR en WebGPU, vérification HTTPS).

**Résultat attendu le dimanche.** Tous les livrables sont remis. Deux répétitions de soutenance à quatre. Laboratoire de Steve : salle 3D à la première personne et en VR, consoles IOS / VRP / PC par modèle, clavier 3D, missions guidées.

**Jalon.** v1.0 le 18 déc, remise le 20 déc

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 74 | Filmer la démo sur PC, mobile et VR émulée. | (hors dépôt) | 2 |
| 75 | Monter la vidéo (5 minutes maximum). | (hors dépôt) | 2 |
| 91 | Demande du superviseur — glisser-déposer des équipements, recadrage automatique, boucle d'image partagée avec la VR ; WebGPU gardé même quand la VR est possible. | src/render/dragControls.js, src/render/index.js, src/render/scene.js | 3 |
| 99 | Demande du superviseur — laboratoire en 3D : salle (sol, murs, plafond lumineux, porte, tableau blanc), paillasses et baies sous les équipements, étagère-catalogue avec tous les modèles ; vue à la première personne (ZQSD/WASD, souris, viseur, E pour la console) et vue de survol ; écran tactile (joystick). | src/render/lab.js, src/render/index.js, src/ui/labHud.js | 5 |

Total : **12 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `src/render/dragControls.js` | nouveau | n° 91 |
| `src/render/index.js` | modifié | n° 91 |
| `src/render/lab.js` | nouveau | n° 99 |
| `src/render/links.js` | modifié | n° 91 |
| `src/render/scene.js` | modifié | n° 91 |
| `src/ui/labHud.js` | nouveau | n° 99 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

`hors-depot/` — aide pour les tâches qui ne vont pas dans le dépôt : `plan-tournage-montage.md`, `video-demo-premier-montage.mp4`. Ne pas copier dans le dépôt.

Tâches hors dépôt : n° 74, n° 75.

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s7-glisser-deposer
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S7/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S7\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Tes deux tâches (tournage et montage) sont hors dépôt. Le dossier `hors-depot/` contient un premier montage de la vidéo et la liste de ce qu'il reste à tourner. Superviseur : onglet Construire, glisser un équipement : il se déplace et ses câbles suivent ; la pastille indique « WebGPU » même avec l'émulateur VR. Laboratoire : le bouton « Laboratoire » fait entrer dans la salle ; ZQSD/WASD et la souris déplacent ; E ouvre la console de l'équipement visé ; V passe en survol.

### 4. Un commit par tâche

```bash
git add src/render/dragControls.js src/render/index.js src/render/links.js src/render/scene.js
git commit -m "S7 n°91 : glisser-déposer et boucle d'image partagée"

git add src/render/lab.js src/ui/labHud.js
git commit -m "S7 n°99 : laboratoire 3D : salle, première personne, étagère-catalogue"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s7-glisser-deposer
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s7-glisser-deposer
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **148 tests réussis**.

