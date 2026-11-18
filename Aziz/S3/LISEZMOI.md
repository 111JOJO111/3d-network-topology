# Aziz — S3 : ARP, ICMP et inspection (16–22 nov)

**Objectif du sprint.** Faire marcher le premier vrai scénario : le ping.

**Résultat attendu le dimanche.** On choisit deux PC, on lance un ping, on voit ARP puis ICMP, on met en pause, on avance pas à pas et on inspecte un paquet.

**Jalon.** MVP : ping démontrable (22 nov)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 31 | Coder ICMP : le ping (demande et réponse), avec ses tests. | protocols/icmp.js, tests/icmp.test.js | 3 |
| 32 | Choisir les couleurs des 9 protocoles et l'aspect d'un paquet broadcast ou unicast. | src/render/packetStyles.js | 3 |
| 33 | Faire un premier jet du diagramme de séquence du ping. | docs/conception/ | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/conception/sequence-ping.md` | nouveau | n° 33 |
| `src/render/index.js` | modifié | n° 32 |
| `src/render/packetStyles.js` | nouveau | n° 32 |
| `src/sim/protocols/icmp.js` | nouveau | n° 31 |
| `tests/icmp.test.js` | nouveau | n° 31 |
| `tests/packetStyles.test.js` | nouveau | n° 32 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s3-icmp-couleurs
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S3/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S3\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario Ping : les requêtes ARP sont des sphères ambre entourées d'un anneau (diffusion), les ICMP des boîtes vertes (unicast). La légende du journal liste les neuf couleurs.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/icmp.js tests/icmp.test.js
git commit -m "S3 n°31 : ICMP : ping, avec ses tests"

git add src/render/index.js src/render/packetStyles.js tests/packetStyles.test.js
git commit -m "S3 n°32 : couleurs des protocoles et formes des paquets"

git add docs/conception/sequence-ping.md
git commit -m "S3 n°33 : premier jet du diagramme de séquence du ping"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s3-icmp-couleurs
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s3-icmp-couleurs
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **50 tests réussis**.

