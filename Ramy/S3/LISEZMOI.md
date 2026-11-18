# Ramy — S3 : ARP, ICMP et inspection (16–22 nov)

**Objectif du sprint.** Faire marcher le premier vrai scénario : le ping.

**Résultat attendu le dimanche.** On choisit deux PC, on lance un ping, on voit ARP puis ICMP, on met en pause, on avance pas à pas et on inspecte un paquet.

**Jalon.** MVP : ping démontrable (22 nov)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 28 | Créer l'inspecteur : un clic sur un paquet affiche ses champs (MAC, IP, TTL, type). | src/ui/inspector.js | 3 |
| 29 | Afficher l'explication de chaque étape du scénario. | src/ui/explanations.js | 2 |
| 30 | Afficher le journal des messages échangés. | src/ui/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **5 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `src/ui/explanations.js` | nouveau | n° 29 |
| `src/ui/index.js` | modifié | n° 30 |
| `src/ui/infoPanel.js` | modifié | n° 30 |
| `src/ui/inspector.js` | nouveau | n° 28 |
| `src/ui/journal.js` | nouveau | n° 30 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s3-inspecteur-explications
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S3/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S3\depot\* . -Recurse -Force`

`git status` doit lister exactement les 5 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Pendant la lecture, le panneau des explications suit chaque message, le journal se remplit, et un clic sur un paquet (ou sur une ligne du journal) ouvre l'inspecteur. Sélectionner deux PC fait apparaître « Lancer un ping ».

### 4. Un commit par tâche

```bash
git add src/ui/inspector.js
git commit -m "S3 n°28 : inspecteur de paquet"

git add src/ui/explanations.js
git commit -m "S3 n°29 : explications de chaque étape"

git add src/ui/index.js src/ui/infoPanel.js src/ui/journal.js
git commit -m "S3 n°30 : journal des messages, tables et ping à la demande"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s3-inspecteur-explications
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s3-inspecteur-explications
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **50 tests réussis**.

