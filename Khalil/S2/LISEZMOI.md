# Khalil — S2 : Scène 3D et moteur d'évènements (9–15 nov)

**Objectif du sprint.** Avoir de vrais équipements en 3D et un moteur qui fait avancer la simulation.

**Résultat attendu le dimanche.** Un paquet de test traverse le réseau et obéit à Lecture, Pause, Pas à pas, Vitesse et Réinitialiser.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 23 | Coder le moteur : une liste d'évènements triée par temps et une horloge simulée. | src/sim/engine.js | 3 |
| 24 | Gérer les états (prêt, lecture, pause, terminé) et les commandes. | src/sim/state.js, commands.js | 3 |
| 25 | Créer le bus d'évènements (Observer) qui prévient l'interface et la 3D, avec ses tests. | src/sim/, tests/ | 2 |

Total : **8 points**.

## Ce que contient ce dossier

`depot/` — **9 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `simulation.js` | modifié | n° 23 |
| `src/sim/commands.js` | modifié | n° 24 |
| `src/sim/engine.js` | modifié | n° 23 |
| `src/sim/eventBus.js` | nouveau | n° 25 |
| `src/sim/network.js` | nouveau | n° 23 |
| `src/sim/state.js` | nouveau | n° 24 |
| `tests/engine.test.js` | nouveau | n° 25 |
| `tests/eventBus.test.js` | nouveau | n° 25 |
| `tests/helpers.js` | nouveau | n° 25 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s2-moteur
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S2/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S2\depot\* . -Recurse -Force`

`git status` doit lister exactement les 9 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Lecture : un paquet de test traverse le réseau de PC1 à SRV1. Pause le fige, Pas à pas avance d'un câble, la vitesse ×4 l'accélère, Réinitialiser le ramène au départ.

### 4. Un commit par tâche

```bash
git add simulation.js src/sim/engine.js src/sim/network.js
git commit -m "S2 n°23 : moteur à évènements discrets et réseau simulé"

git add src/sim/commands.js src/sim/state.js
git commit -m "S2 n°24 : états de la simulation et commandes"

git add src/sim/eventBus.js tests/engine.test.js tests/eventBus.test.js tests/helpers.js
git commit -m "S2 n°25 : bus d'évènements (Observer) et tests du moteur"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s2-moteur
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s2-moteur
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **30 tests réussis**.

