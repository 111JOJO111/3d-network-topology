# Ayoub — S3 : ARP, ICMP et inspection (16–22 nov)

**Objectif du sprint.** Faire marcher le premier vrai scénario : le ping.

**Résultat attendu le dimanche.** On choisit deux PC, on lance un ping, on voit ARP puis ICMP, on met en pause, on avance pas à pas et on inspecte un paquet.

**Jalon.** MVP : ping démontrable (22 nov)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 37 | Coder le switch : il apprend les adresses MAC et envoie partout s'il ne connaît pas la destination. | devices/switch.js | 3 |
| 38 | Écrire les tests du switch. | tests/switch.test.js | 1 |
| 39 | Créer le scénario de démonstration ping.json (deux réseaux reliés par un routeur). | scenarios/ping.json | 2 |
| 40 | Dessiner le diagramme de déploiement. | docs/conception/ | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **5 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/conception/deploiement.md` | nouveau | n° 40 |
| `scenarios/ping.json` | nouveau | n° 39 |
| `src/sim/devices/switch.js` | nouveau | n° 37 |
| `tests/switch.test.js` | nouveau | n° 38 |
| `scenarios/index.json` | modifié — fichier partagé, dernière modification par Khalil | n° 39 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s3-switch-ping
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S3/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S3\depot\* . -Recurse -Force`

`git status` doit lister exactement les 5 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario Ping chargé par défaut : SW1 inonde la première requête ARP, puis n'envoie plus que sur le bon port ; sa table MAC se remplit dans le panneau d'infos.

### 4. Un commit par tâche

```bash
git add src/sim/devices/switch.js
git commit -m "S3 n°37 : switch : apprentissage et inondation"

git add tests/switch.test.js
git commit -m "S3 n°38 : tests du switch"

git add scenarios/ping.json scenarios/index.json
git commit -m "S3 n°39 : scénario de démonstration ping.json"

git add docs/conception/deploiement.md
git commit -m "S3 n°40 : diagramme de déploiement"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s3-switch-ping
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s3-switch-ping
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **50 tests réussis**.

## Attention : fichier partagé

`scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

