# Khalil — S7 : Livraison (14–20 déc)

**Objectif du sprint.** Produire la vidéo, finir la documentation et préparer la soutenance. Seuls ajouts : ceux demandés par le superviseur (éditeur de topologie, VR en WebGPU, vérification HTTPS).

**Résultat attendu le dimanche.** Tous les livrables sont remis. Deux répétitions de soutenance à quatre. Laboratoire de Steve : salle 3D à la première personne et en VR, consoles IOS / VRP / PC par modèle, clavier 3D, missions guidées.

**Jalon.** v1.0 le 18 déc, remise le 20 déc

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 76 | Écrire la documentation d'architecture générale. | docs/architecture.md | 3 |
| 77 | Optionnel : ajouter IPv6 simplifié (F09), seulement si aucun bug n'est ouvert. | protocols/ipv6.js | 1 |
| 89 | Demande du superviseur — fonctions de construction d'une topologie pour l'éditeur (ajout, câblage, réglages, adressage automatique, import/export, historique) et leurs tests. | src/sim/builder.js, tests/builder.test.js, src/sim/scenario.js | 4 |
| 97 | Demande du superviseur — laboratoire : consoles des équipements. Interpréteur de commandes en trois styles selon le modèle (IOS, VRP, invite de commandes du PC) : modes, abréviations, aide « ? », complétion, show / display, configuration qui modifie vraiment le réseau, ping et traceroute joués dans la scène. Missions guidées vérifiées automatiquement. | src/sim/config.js, src/sim/cli.js, src/sim/missions.js, simulation.js, tests/cli.test.js, tests/missions.test.js, docs/console.md | 5 |

Total : **13 points**.

## Ce que contient ce dossier

`depot/` — **19 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/architecture.md` | nouveau | n° 76 |
| `docs/console.md` | nouveau | n° 97 |
| `docs/debit.md` | modifié | n° 89 |
| `docs/diagnostic.md` | modifié | n° 89 |
| `docs/protocoles/ipv6.md` | nouveau | n° 77 |
| `scenarios/ipv6.json` | nouveau | n° 77 |
| `simulation.js` | modifié | n° 97 |
| `src/sim/builder.js` | nouveau | n° 89 |
| `src/sim/cli.js` | nouveau | n° 97 |
| `src/sim/config.js` | nouveau | n° 97 |
| `src/sim/missions.js` | nouveau | n° 97 |
| `src/sim/protocols/ipv6.js` | nouveau | n° 77 |
| `src/sim/scenario.js` | modifié | n° 89 |
| `tests/builder.test.js` | nouveau | n° 89 |
| `tests/cli.test.js` | nouveau | n° 97 |
| `tests/golden/ipv6.txt` | nouveau | n° 77 |
| `tests/ipv6.test.js` | nouveau | n° 77 |
| `tests/missions.test.js` | nouveau | n° 97 |
| `scenarios/index.json` | modifié — fichier partagé, dernière modification par Ayoub | n° 77 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s7-editeur-ipv6
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S7/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S7\depot\* . -Recurse -Force`

`git status` doit lister exactement les 19 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario IPv6 : Neighbor Solicitation en multidiffusion (octaèdre), Advertisement, puis ping ; au second ping, plus de sollicitation. Superviseur : tests/builder.test.js (un réseau construit, adressé automatiquement, laisse passer un ping à travers deux routeurs). Consoles : `npm test` passe tests/cli.test.js et tests/missions.test.js.

### 4. Un commit par tâche

```bash
git add docs/architecture.md
git commit -m "S7 n°76 : documentation d'architecture générale"

git add docs/protocoles/ipv6.md scenarios/ipv6.json src/sim/protocols/ipv6.js tests/golden/ipv6.txt tests/ipv6.test.js scenarios/index.json
git commit -m "S7 n°77 : IPv6 simplifié (F09, optionnel)"

git add docs/debit.md docs/diagnostic.md src/sim/builder.js src/sim/scenario.js tests/builder.test.js
git commit -m "S7 n°89 : fonctions de construction de topologie"

git add docs/console.md simulation.js src/sim/cli.js src/sim/config.js src/sim/missions.js tests/cli.test.js tests/missions.test.js
git commit -m "S7 n°97 : laboratoire : consoles IOS / VRP / PC et missions"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s7-editeur-ipv6
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s7-editeur-ipv6
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **148 tests réussis**.

## Attention : fichier partagé

`src/sim/scenario.js`, `scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

