# Ramy — S4 : Catalogue de protocoles (23–29 nov)

**Objectif du sprint.** Ajouter DHCP, UDP, DNS et TCP, et démarrer le mode VR.

**Résultat attendu le dimanche.** Six protocoles au choix, chacun avec ses explications et ses tests. On entre et on sort de la VR dans l'émulateur.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 41 | Coder DHCP : un PC obtient son adresse IP automatiquement (4 messages). | protocols/dhcp.js | 3 |
| 42 | Créer le scénario DHCP avec ses tests et ses textes d'explication. | scenarios/dhcp.json, tests/ | 2 |
| 43 | Créer la liste qui permet de choisir le scénario à jouer. | src/ui/scenarioPicker.js | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `scenarios/dhcp.json` | nouveau | n° 42 |
| `src/sim/protocols/dhcp.js` | nouveau | n° 41 |
| `src/ui/index.js` | modifié | n° 43 |
| `src/ui/scenarioPicker.js` | nouveau | n° 43 |
| `tests/dhcp.test.js` | nouveau | n° 42 |
| `scenarios/index.json` | modifié — fichier partagé, dernière modification par Ayoub | n° 43 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s4-dhcp-choix-scenario
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S4/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S4\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

La liste de choix en haut propose les scénarios ; choisir DHCP : PC1 obtient son adresse en quatre messages et son étiquette passe de « — (IP ?) » à 192.168.1.100.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/dhcp.js
git commit -m "S4 n°41 : DHCP : les quatre messages"

git add scenarios/dhcp.json tests/dhcp.test.js
git commit -m "S4 n°42 : scénario DHCP et ses tests"

git add src/ui/index.js src/ui/scenarioPicker.js scenarios/index.json
git commit -m "S4 n°43 : liste de choix du scénario"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s4-dhcp-choix-scenario
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s4-dhcp-choix-scenario
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **67 tests réussis**.

## Attention : fichier partagé

`scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

