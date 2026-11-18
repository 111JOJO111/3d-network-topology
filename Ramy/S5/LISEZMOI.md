# Ramy — S5 : VR, PWA et extensions (30 nov–6 déc)

**Objectif du sprint.** Terminer la VR et l'installation de l'application, ajouter HTTP et le routage statique. Ajout demandé par le superviseur : le débit (vitesse des liens, files d'attente, pertes, transferts TCP).

**Résultat attendu le dimanche.** Les étapes 1 à 6 de la démo du cahier des charges passent (sauf le hors ligne).

**Jalon.** Démo complète (6 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 51 | Coder HTTP : une page web demandée après DNS et la connexion TCP. | protocols/http.js | 3 |
| 52 | Créer le scénario HTTP avec ses tests et ses textes d'explication. | scenarios/http.json, tests/ | 1 |
| 53 | Gérer le bouton « Installer l'application » et le message si l'installation est refusée. | src/ui/install.js | 2 |
| 83 | Demande du superviseur — vitesse ×0,25 dans les commandes ; cas d'utilisation « comparer des débits ». | src/ui/controls.js, docs/conception/ | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **9 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/conception/cas-utilisation.md` | modifié | n° 83 |
| `index.html` | modifié | n° 53 |
| `scenarios/http.json` | nouveau | n° 52 |
| `src/sim/protocols/http.js` | nouveau | n° 51 |
| `src/ui/controls.js` | modifié | n° 83 |
| `src/ui/index.js` | modifié | n° 53 |
| `src/ui/install.js` | nouveau | n° 53 |
| `tests/http.test.js` | nouveau | n° 52 |
| `scenarios/index.json` | modifié | n° 52 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s5-http-installation
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S5/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S5\depot\* . -Recurse -Force`

`git status` doit lister exactement les 9 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario HTTP : DNS, puis TCP, puis GET / et 200 OK ; seconde étape : 404. Dans Chrome, le bouton « Installer l'application » apparaît (sur le site HTTPS ou sur localhost). Superviseur : la liste « Vitesse » propose ×0,25.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/http.js
git commit -m "S5 n°51 : HTTP : requête et réponse après DNS et TCP"

git add scenarios/http.json tests/http.test.js scenarios/index.json
git commit -m "S5 n°52 : scénario HTTP et ses tests"

git add index.html src/ui/index.js src/ui/install.js
git commit -m "S5 n°53 : bouton « Installer l'application »"

git add docs/conception/cas-utilisation.md src/ui/controls.js
git commit -m "S5 n°83 : vitesse ×0,25 et cas d'utilisation Débit"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s5-http-installation
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s5-http-installation
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **86 tests réussis**.

## Attention : fichier partagé

`index.html`, `scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

