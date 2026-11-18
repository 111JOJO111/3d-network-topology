# Khalil — S4 : Catalogue de protocoles (23–29 nov)

**Objectif du sprint.** Ajouter DHCP, UDP, DNS et TCP, et démarrer le mode VR.

**Résultat attendu le dimanche.** Six protocoles au choix, chacun avec ses explications et ses tests. On entre et on sort de la VR dans l'émulateur.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 47 | Coder TCP : ouverture de connexion en 3 temps, envoi de données, fermeture. | protocols/tcp.js | 5 |
| 48 | Créer le scénario TCP avec ses tests et ses textes d'explication. | scenarios/tcp.json, tests/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **3 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `scenarios/tcp.json` | nouveau | n° 48 |
| `src/sim/protocols/tcp.js` | nouveau | n° 47 |
| `tests/tcp.test.js` | nouveau | n° 48 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s4-tcp
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S4/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S4\depot\* . -Recurse -Force`

`git status` doit lister exactement les 3 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario TCP : SYN, SYN-ACK, ACK, données acquittées (ack = 1016), fermeture en quatre segments ; seconde étape : RST sur le port fermé.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/tcp.js
git commit -m "S4 n°47 : TCP : ouverture, données, fermeture"

git add scenarios/tcp.json tests/tcp.test.js
git commit -m "S4 n°48 : scénario TCP et ses tests"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s4-tcp
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s4-tcp
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **67 tests réussis**.

