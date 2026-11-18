# Khalil — S5 : VR, PWA et extensions (30 nov–6 déc)

**Objectif du sprint.** Terminer la VR et l'installation de l'application, ajouter HTTP et le routage statique. Ajout demandé par le superviseur : le débit (vitesse des liens, files d'attente, pertes, transferts TCP).

**Résultat attendu le dimanche.** Les étapes 1 à 6 de la démo du cahier des charges passent (sauf le hors ligne).

**Jalon.** Démo complète (6 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 56 | Coder le routage statique : tables de routage, TTL qui diminue, réseau à 2 routeurs. | devices/router.js | 4 |
| 57 | Créer le scénario de routage avec ses tests et ses textes d'explication. | scenarios/, tests/ | 2 |
| 80 | Demande du superviseur — débit : catalogue fictif d'équipements et de câbles (vitesse négociée de chaque lien), taille et temps d'émission des trames, files d'attente des ports, pertes, mesure du trafic ; vitesse ×0,25 ; nouveaux champs des scénarios (model, cable, length, speed, size, window, lose, group). | src/sim/catalog.js, src/sim/traffic.js, src/sim/network.js, src/sim/scenario.js, simulation.js | 4 |
| 81 | Demande du superviseur — TCP : transferts découpés à fenêtre glissante, ACK cumulatifs et dupliqués, retransmission rapide et délai RTO ; scénario « Débit », tests et documentation. | src/sim/protocols/tcp.js, scenarios/debit.json, tests/debit.test.js, docs/debit.md | 3 |

Total : **13 points**.

## Ce que contient ce dossier

`depot/` — **15 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/debit.md` | nouveau | n° 81 |
| `docs/format-scenario.md` | modifié | n° 80 |
| `scenarios/debit.json` | nouveau | n° 81 |
| `scenarios/routage.json` | nouveau | n° 57 |
| `simulation.js` | modifié | n° 80 |
| `src/sim/catalog.js` | nouveau | n° 80 |
| `src/sim/devices/router.js` | modifié | n° 56 |
| `src/sim/engine.js` | modifié | n° 80 |
| `src/sim/network.js` | modifié | n° 80 |
| `src/sim/protocols/tcp.js` | modifié | n° 81 |
| `src/sim/scenario.js` | modifié | n° 80 |
| `src/sim/traffic.js` | nouveau | n° 80 |
| `tests/debit.test.js` | nouveau | n° 81 |
| `tests/engine.test.js` | modifié | n° 80 |
| `tests/routage.test.js` | nouveau | n° 57 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s5-routage-debit
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S5/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S5\depot\* . -Recurse -Force`

`git status` doit lister exactement les 15 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario Routage : la table de routage de R1 et R2 s'affiche, le TTL passe de 64 à 62, le paquet à TTL 1 est détruit par R1 (Time Exceeded), 172.16.0.1 est sans route. Superviseur : `npm test` (tests/debit.test.js) ; scénario « Débit » : le journal donne la durée et le débit utile de chaque transfert, l'étape 3 montre les ACK dupliqués, la retransmission rapide puis le délai RTO.

### 4. Un commit par tâche

```bash
git add src/sim/devices/router.js
git commit -m "S5 n°56 : routage statique et TTL"

git add scenarios/routage.json tests/routage.test.js
git commit -m "S5 n°57 : scénario de routage et ses tests"

git add docs/format-scenario.md simulation.js src/sim/catalog.js src/sim/engine.js src/sim/network.js src/sim/scenario.js src/sim/traffic.js tests/engine.test.js
git commit -m "S5 n°80 : débit : catalogue, vitesse des liens, files d'attente, pertes"

git add docs/debit.md scenarios/debit.json src/sim/protocols/tcp.js tests/debit.test.js
git commit -m "S5 n°81 : TCP à fenêtre glissante et scénario Débit"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s5-routage-debit
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s5-routage-debit
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **86 tests réussis**.

## Attention : fichier partagé

`src/sim/scenario.js` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

