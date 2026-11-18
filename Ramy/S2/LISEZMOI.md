# Ramy — S2 : Scène 3D et moteur d'évènements (9–15 nov)

**Objectif du sprint.** Avoir de vrais équipements en 3D et un moteur qui fait avancer la simulation.

**Résultat attendu le dimanche.** Un paquet de test traverse le réseau et obéit à Lecture, Pause, Pas à pas, Vitesse et Réinitialiser.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 17 | Créer les boutons Lecture, Pause, Pas à pas, Vitesse et Réinitialiser, reliés aux commandes du moteur. | src/ui/controls.js | 3 |
| 18 | Permettre de sélectionner un objet 3D au clic ou au toucher (fonction pick). | src/ui/selection.js | 3 |
| 19 | Afficher un panneau d'infos (nom, IP, MAC) quand on sélectionne un équipement. | src/ui/ | 2 |

Total : **8 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `src/ui/controls.js` | nouveau | n° 17 |
| `src/ui/dom.js` | nouveau | n° 17 |
| `src/ui/index.js` | modifié | n° 19 |
| `src/ui/infoPanel.js` | nouveau | n° 19 |
| `src/ui/selection.js` | nouveau | n° 18 |
| `src/ui/toast.js` | nouveau | n° 17 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s2-commandes-selection
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S2/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S2\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Sous la scène : Lecture, Pause, Pas à pas, Vitesse, Réinitialiser. Cliquer sur un équipement l'entoure d'un anneau et affiche son nom, son IP et sa MAC. Espace, → et R fonctionnent au clavier.

### 4. Un commit par tâche

```bash
git add src/ui/controls.js src/ui/dom.js src/ui/toast.js
git commit -m "S2 n°17 : boutons Lecture, Pause, Pas à pas, Vitesse, Réinitialiser"

git add src/ui/selection.js
git commit -m "S2 n°18 : sélection d'un objet 3D (pick)"

git add src/ui/index.js src/ui/infoPanel.js
git commit -m "S2 n°19 : panneau d'infos d'un équipement"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s2-commandes-selection
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s2-commandes-selection
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. Ayoub  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz et Ayoub aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **30 tests réussis**.

