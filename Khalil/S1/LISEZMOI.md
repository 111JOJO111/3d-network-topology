# Khalil — S1 : Fondations et contrats (2–8 nov)

**Objectif du sprint.** Mettre en place le dépôt et la scène 3D, et se mettre d'accord sur les formats communs pour que chacun puisse ensuite travailler seul.

**Résultat attendu le dimanche.** Le site s'ouvre sur GitHub Pages et affiche une topologie. Les formats communs (contrats) et leurs mocks sont validés par les quatre. Le moteur de rendu est choisi.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 9 | Définir le format des fichiers de scénario JSON : équipements, adresses MAC/IP, liens, étapes et explications. | src/sim/, docs/ | 2 |
| 10 | Définir le format d'un évènement réseau (events.js) et les fonctions que chaque protocole doit fournir. | src/sim/events.js | 2 |
| 11 | Définir les commandes (lecture, pause, pas à pas, vitesse, réinitialisation) et fournir un faux moteur (mock). | src/sim/ | 1 |
| 12 | Créer le squelette du moteur et les premiers tests automatiques. | simulation.js, src/sim/, tests/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **13 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/contrats.md` | nouveau | n° 10 |
| `docs/format-scenario.md` | nouveau | n° 9 |
| `scenarios/topologie-demo.json` | nouveau | n° 9 |
| `simulation.js` | nouveau | n° 12 |
| `src/sim/addr.js` | nouveau | n° 9 |
| `src/sim/commands.js` | nouveau | n° 11 |
| `src/sim/engine.js` | nouveau | n° 12 |
| `src/sim/events.js` | nouveau | n° 10 |
| `src/sim/mockEngine.js` | nouveau | n° 11 |
| `src/sim/registry.js` | nouveau | n° 10 |
| `src/sim/scenario.js` | nouveau | n° 9 |
| `tests/contrats.test.js` | nouveau | n° 12 |
| `scenarios/index.json` | nouveau | n° 9 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

**Première fois :** attends qu'Ayoub ait créé le dépôt et t'ait invité, puis clone-le (`../GUIDE-GITHUB.md`, section 2).

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s1-contrats
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S1/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S1\depot\* . -Recurse -Force`

`git status` doit lister exactement les 13 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

`npm test` : les tests des contrats passent. Dans la console du navigateur, `app.sim.scenario.id` affiche "topologie-demo".

### 4. Un commit par tâche

```bash
git add docs/format-scenario.md scenarios/topologie-demo.json src/sim/addr.js src/sim/scenario.js scenarios/index.json
git commit -m "S1 n°9 : format des scénarios JSON"

git add docs/contrats.md src/sim/events.js src/sim/registry.js
git commit -m "S1 n°10 : format des évènements réseau et contrat des protocoles"

git add src/sim/commands.js src/sim/mockEngine.js
git commit -m "S1 n°11 : commandes et faux moteur (mock)"

git add simulation.js src/sim/engine.js tests/contrats.test.js
git commit -m "S1 n°12 : squelette du moteur et premiers tests"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s1-contrats
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s1-contrats
```

## Ordre de fusion conseillé cette semaine

1. Ayoub  →  2. **Khalil (toi)**  →  3. Aziz  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Ayoub ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **14 tests réussis**.

## Attention : fichier partagé

`src/sim/events.js`, `src/sim/scenario.js`, `scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

