# Ramy — S1 : Fondations et contrats (2–8 nov)

**Objectif du sprint.** Mettre en place le dépôt et la scène 3D, et se mettre d'accord sur les formats communs pour que chacun puisse ensuite travailler seul.

**Résultat attendu le dimanche.** Le site s'ouvre sur GitHub Pages et affiche une topologie. Les formats communs (contrats) et leurs mocks sont validés par les quatre. Le moteur de rendu est choisi.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 1 | Dessiner la maquette de l'interface : où vont les boutons, l'inspecteur et les explications. | docs/conception/ | 2 |
| 2 | Créer la page index.html et la feuille de style, avec des zones vides réservées aux autres (#controls, #inspector, #explanations, #xr-slot, #install-slot). | index.html, styles.css | 2 |
| 3 | Créer ui/index.js, qui démarre tous les modules de l'interface. | src/ui/index.js | 1 |
| 4 | Dessiner le diagramme de cas d'utilisation. | docs/conception/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **8 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/conception/cas-utilisation.md` | nouveau | n° 4 |
| `docs/conception/maquette.md` | nouveau | n° 1 |
| `docs/conception/maquette.svg` | nouveau | n° 1 |
| `index.html` | nouveau | n° 2 |
| `src/ui/i18n.js` | nouveau | n° 3 |
| `src/ui/index.js` | nouveau | n° 3 |
| `styles.css` | nouveau | n° 2 |
| `tests/ui-i18n.test.js` | nouveau | n° 3 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ramy/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

**Première fois :** attends qu'Ayoub ait créé le dépôt et t'ait invité, puis clone-le (`../GUIDE-GITHUB.md`, section 2).

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ramy-s1-maquette-page
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ramy/S1/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ramy\S1\depot\* . -Recurse -Force`

`git status` doit lister exactement les 8 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

La page s'ouvre avec la barre du haut, le titre du scénario et le bouton de langue (English / Français). Les panneaux de droite restent vides : c'est normal, ils se rempliront à partir de S2.

### 4. Un commit par tâche

```bash
git add docs/conception/maquette.md docs/conception/maquette.svg
git commit -m "S1 n°1 : maquette de l'interface"

git add index.html styles.css
git commit -m "S1 n°2 : page index.html et feuille de style"

git add src/ui/i18n.js src/ui/index.js tests/ui-i18n.test.js
git commit -m "S1 n°3 : démarrage de l'interface (ui/index.js) et langues"

git add docs/conception/cas-utilisation.md
git commit -m "S1 n°4 : diagramme de cas d'utilisation"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ramy-s1-maquette-page
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ramy-s1-maquette-page
```

## Ordre de fusion conseillé cette semaine

1. Ayoub  →  2. Khalil  →  3. Aziz  →  4. **Ramy (toi)**

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Ayoub et Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **14 tests réussis**.

## Attention : fichier partagé

`index.html` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

