# Ayoub — S4 : Catalogue de protocoles (23–29 nov)

**Objectif du sprint.** Ajouter DHCP, UDP, DNS et TCP, et démarrer le mode VR.

**Résultat attendu le dimanche.** Six protocoles au choix, chacun avec ses explications et ses tests. On entre et on sort de la VR dans l'émulateur.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 49 | Ajouter le bouton « Entrer en VR » et gérer l'entrée et la sortie du mode VR. | src/xr/session.js | 3 |
| 50 | Créer un panneau de contrôle en 3D visible dans la VR (le HTML y disparaît). | src/xr/vrPanel.js | 4 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **3 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `src/xr/index.js` | modifié | n° 49 |
| `src/xr/session.js` | nouveau | n° 49 |
| `src/xr/vrPanel.js` | nouveau | n° 50 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s4-vr-session
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S4/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S4\depot\* . -Recurse -Force`

`git status` doit lister exactement les 3 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Avec l'extension Immersive Web Emulator : « Entrer en VR » ouvre la session, un panneau 3D montre l'état et les boutons, « Quitter » ramène au mode classique.

### 4. Un commit par tâche

```bash
git add src/xr/index.js src/xr/session.js
git commit -m "S4 n°49 : bouton « Entrer en VR » et session WebXR"

git add src/xr/vrPanel.js
git commit -m "S4 n°50 : panneau de contrôle 3D visible en VR"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s4-vr-session
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s4-vr-session
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **67 tests réussis**.

