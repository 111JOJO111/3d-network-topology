# Ramy — S6 : Stabilisation et hors ligne (7–13 déc)

**Objectif du sprint.** Tester, corriger, faire marcher l'appli sans internet et écrire la documentation. Ajouts demandés par le superviseur : diagnostic du réseau, fiche technique, scénarios ARP et traceroute.

**Résultat attendu le dimanche.** Un membre qui n'a pas codé la démo la rejoue entièrement sans aide. Version v1.0-rc taguée.

**Jalon.** Gel des fonctionnalités (13 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 61 | Écrire le manuel utilisateur (navigation, ping, inspection, installation, VR, dépannage). | docs/manuel.md | 4 |
| 62 | Assembler le cahier conceptuel (diagrammes de chacun) et écrire le README. | docs/cahier-conceptuel.md, README.md | 2 |
| 88 | Demande du superviseur — onglets de la colonne de droite, onglet Diagnostic (Montrer, Corriger, Tout corriger), fiche technique et ports en direct dans le panneau d'infos. | src/ui/tabs.js, src/ui/diagnosticPanel.js, src/ui/datasheet.js, src/ui/infoPanel.js, index.html, styles.css | 4 |

Total : **10 points**.

## Ce que contient ce dossier

`depot/` — **12 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/cahier-conceptuel.md` | nouveau | n° 62 |
| `docs/conception/cas-utilisation.md` | modifié | n° 88 |
| `docs/conception/maquette.md` | modifié | n° 88 |
| `docs/manuel.md` | nouveau | n° 61 |
| `index.html` | modifié | n° 88 |
| `src/ui/datasheet.js` | nouveau | n° 88 |
| `src/ui/diagnosticPanel.js` | nouveau | n° 88 |
| `src/ui/index.js` | modifié | n° 88 |
| `src/ui/infoPanel.js` | modifié | n° 88 |
| `src/ui/tabs.js` | nouveau | n° 88 |
| `styles.css` | modifié | n° 88 |
| `README.md` | modifié — fichier partagé, dernière modification par Ayoub | n° 62 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s6-manuel-diagnostic
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S6/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S6\depot\* . -Recurse -Force`

`git status` doit lister exactement les 12 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Relire docs/manuel.md et le README en suivant chaque étape dans l'application ; remplacer `<compte>/<depot>` par l'adresse réelle du dépôt. Superviseur : en haut de la colonne de droite, les onglets Lecture et Diagnostic ; le Diagnostic du scénario « Diagnostic » liste 4 erreurs, « Tout corriger » les règle ; cliquer SW1 dans « Débit » affiche sa fiche technique et ses ports en direct.

### 4. Un commit par tâche

```bash
git add docs/manuel.md
git commit -m "S6 n°61 : manuel utilisateur"

git add docs/cahier-conceptuel.md README.md
git commit -m "S6 n°62 : cahier conceptuel et README"

git add docs/conception/cas-utilisation.md docs/conception/maquette.md index.html src/ui/datasheet.js src/ui/diagnosticPanel.js src/ui/index.js src/ui/infoPanel.js src/ui/tabs.js styles.css
git commit -m "S6 n°88 : onglets, onglet Diagnostic et fiche technique"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s6-manuel-diagnostic
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s6-manuel-diagnostic
```

## Ordre de fusion conseillé cette semaine

1. Aziz  →  2. Khalil  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Aziz et Khalil et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **109 tests réussis**.

## Attention : fichier partagé

`index.html` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

