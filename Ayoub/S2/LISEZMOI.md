# Ayoub — S2 : Scène 3D et moteur d'évènements (9–15 nov)

**Objectif du sprint.** Avoir de vrais équipements en 3D et un moteur qui fait avancer la simulation.

**Résultat attendu le dimanche.** Un paquet de test traverse le réseau et obéit à Lecture, Pause, Pas à pas, Vitesse et Réinitialiser.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 26 | Animer les paquets qui avancent sur les câbles au rythme de l'horloge simulée (et non des images). | src/render/packetAnimator.js | 5 |
| 27 | Écrire le script qui génère tout seul la liste des fichiers à mettre en cache, lancé par la CI. | tools/, .github/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `.github/workflows/ci.yml` | modifié | n° 27 |
| `src/render/packetAnimator.js` | nouveau | n° 26 |
| `sw.js` | modifié | n° 27 |
| `tests/precache.test.js` | nouveau | n° 27 |
| `tools/generate-precache.mjs` | nouveau | n° 27 |
| `package.json` | modifié | n° 27 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s2-animation-precache
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S2/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S2\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Le paquet de test se déplace sur les câbles, se fige en pause et accélère avec la vitesse. `npm start` affiche « precache-manifest.js : N fichiers ».

### 4. Un commit par tâche

```bash
git add src/render/packetAnimator.js
git commit -m "S2 n°26 : animation des paquets sur les câbles"

git add .github/workflows/ci.yml sw.js tests/precache.test.js tools/generate-precache.mjs package.json
git commit -m "S2 n°27 : génération automatique de la liste de cache"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s2-animation-precache
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s2-animation-precache
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **30 tests réussis**.

