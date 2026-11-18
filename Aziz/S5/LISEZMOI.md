# Aziz — S5 : VR, PWA et extensions (30 nov–6 déc)

**Objectif du sprint.** Terminer la VR et l'installation de l'application, ajouter HTTP et le routage statique. Ajout demandé par le superviseur : le débit (vitesse des liens, files d'attente, pertes, transferts TCP).

**Résultat attendu le dimanche.** Les étapes 1 à 6 de la démo du cahier des charges passent (sauf le hors ligne).

**Jalon.** Démo complète (6 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 54 | Rendre l'appli fluide sur mobile (réutiliser formes et matériaux, limiter les paquets affichés). | src/render/ | 3 |
| 55 | Rendre la scène lisible en VR (taille de la scène, taille des étiquettes). | src/render/ | 3 |
| 82 | Demande du superviseur — couleurs des câbles selon leur charge (vert, orange, rouge) et étiquette de vitesse des liens bridés. | src/render/linkLoad.js, src/render/links.js | 3 |

Total : **9 points**.

## Ce que contient ce dossier

`depot/` — **4 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `src/render/index.js` | modifié | n° 55 |
| `src/render/linkLoad.js` | nouveau | n° 82 |
| `src/render/links.js` | modifié | n° 82 |
| `src/render/scene.js` | modifié | n° 54 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s5-mobile-vr-charge
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S5/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S5\depot\* . -Recurse -Force`

`git status` doit lister exactement les 4 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Sur téléphone (ou en mode appareil mobile de Chrome), l'animation reste fluide. En VR émulée, la topologie apparaît comme une maquette devant soi, avec des étiquettes lisibles. Superviseur : scénario « Débit », lecture en ×4 : les câbles virent au vert, à l'orange puis au rouge selon leur charge ; les liens de PC2 et PC3 portent une étiquette orange « 100 Mb/s ».

### 4. Un commit par tâche

```bash
git add src/render/scene.js
git commit -m "S5 n°54 : fluidité sur mobile"

git add src/render/index.js
git commit -m "S5 n°55 : lisibilité de la scène en VR"

git add src/render/linkLoad.js src/render/links.js
git commit -m "S5 n°82 : charge des câbles et vitesse des liens"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s5-mobile-vr-charge
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s5-mobile-vr-charge
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **86 tests réussis**.

