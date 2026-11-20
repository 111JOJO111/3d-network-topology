# Ramy — S7 : Livraison (14–20 déc)

**Objectif du sprint.** Produire la vidéo, finir la documentation et préparer la soutenance. Seuls ajouts : ceux demandés par le superviseur (éditeur de topologie, VR en WebGPU, vérification HTTPS).

**Résultat attendu le dimanche.** Tous les livrables sont remis. Deux répétitions de soutenance à quatre. Laboratoire de Steve : salle 3D à la première personne et en VR, consoles IOS / VRP / PC par modèle, clavier 3D, missions guidées.

**Jalon.** v1.0 le 18 déc, remise le 20 déc

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 72 | Écrire le script de la vidéo et enregistrer la voix off. | (hors dépôt) | 3 |
| 73 | Documenter DHCP et HTTP. | docs/protocoles/ | 1 |
| 90 | Demande du superviseur — onglet Construire (éditeur de topologie, sauvegardes, import/export, annuler), réseau personnalisé dans le choix de scénario ; documentation, captures et README. | src/ui/editorPanel.js, src/ui/scenarioPicker.js, docs/editeur.md, docs/captures/, README.md | 5 |
| 98 | Demande du superviseur — laboratoire : fenêtre de console (onglets par équipement, historique, Tab, ?), bouton Console dans le panneau Équipement, catalogue de l'éditeur avec la fiche de chaque modèle (description, ports, système), onglet Missions (objectifs, indices, « Pourquoi ? »). Manuel du laboratoire. | src/ui/terminal.js, src/ui/missions.js, src/ui/editorPanel.js, src/ui/infoPanel.js, src/ui/index.js, index.html, styles.css, docs/laboratoire.md, docs/manuel.md | 5 |

Total : **14 points**.

## Ce que contient ce dossier

`depot/` — **19 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/captures/debit-charge.jpg` | nouveau | n° 90 |
| `docs/captures/diagnostic.jpg` | nouveau | n° 90 |
| `docs/captures/editeur.jpg` | nouveau | n° 90 |
| `docs/conception/cas-utilisation.md` | modifié | n° 90 |
| `docs/conception/maquette.md` | modifié | n° 90 |
| `docs/editeur.md` | nouveau | n° 90 |
| `docs/laboratoire.md` | nouveau | n° 98 |
| `docs/manuel.md` | modifié | n° 90 |
| `docs/protocoles/dhcp.md` | nouveau | n° 73 |
| `docs/protocoles/http.md` | nouveau | n° 73 |
| `index.html` | modifié | n° 90 |
| `src/ui/editorPanel.js` | nouveau | n° 90 |
| `src/ui/index.js` | modifié | n° 90 |
| `src/ui/infoPanel.js` | modifié | n° 98 |
| `src/ui/missions.js` | nouveau | n° 98 |
| `src/ui/scenarioPicker.js` | modifié | n° 90 |
| `src/ui/terminal.js` | nouveau | n° 98 |
| `styles.css` | modifié | n° 90 |
| `README.md` | modifié | n° 90 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

`hors-depot/` — aide pour les tâches qui ne vont pas dans le dépôt : `script-video.md`. Ne pas copier dans le dépôt.

Tâche hors dépôt : n° 72.

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s7-editeur-docs
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S7/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S7\depot\* . -Recurse -Force`

`git status` doit lister exactement les 19 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Relire les deux pages dans GitHub (les diagrammes Mermaid s'y affichent). Superviseur : onglet Construire → « Nouveau réseau vide », ajouter deux PC et un switch, les relier (outil « Relier »), « Adressage automatique », puis « Lancer » un ping ; « Annuler » / « Rétablir », « Exporter » puis « Importer » le JSON. Laboratoire : un clic sur R1 puis « Ouvrir la console » ; `enable` puis `show ip route` répondent. L'onglet Missions liste six missions.

### 4. Un commit par tâche

```bash
git add docs/protocoles/dhcp.md docs/protocoles/http.md
git commit -m "S7 n°73 : documentation de DHCP et HTTP"

git add docs/captures/debit-charge.jpg docs/captures/diagnostic.jpg docs/captures/editeur.jpg docs/conception/cas-utilisation.md docs/conception/maquette.md docs/editeur.md docs/manuel.md index.html src/ui/editorPanel.js src/ui/index.js src/ui/scenarioPicker.js styles.css README.md
git commit -m "S7 n°90 : éditeur de topologie (onglet Construire)"

git add docs/laboratoire.md src/ui/infoPanel.js src/ui/missions.js src/ui/terminal.js
git commit -m "S7 n°98 : laboratoire : fenêtre de console, catalogue des modèles, onglet Missions"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s7-editeur-docs
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s7-editeur-docs
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **148 tests réussis**.

## Attention : fichier partagé

`index.html` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

