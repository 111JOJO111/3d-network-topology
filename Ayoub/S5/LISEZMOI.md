# Ayoub — S5 : VR, PWA et extensions (30 nov–6 déc)

**Objectif du sprint.** Terminer la VR et l'installation de l'application, ajouter HTTP et le routage statique. Ajout demandé par le superviseur : le débit (vitesse des liens, files d'attente, pertes, transferts TCP).

**Résultat attendu le dimanche.** Les étapes 1 à 6 de la démo du cahier des charges passent (sauf le hors ligne).

**Jalon.** Démo complète (6 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 58 | Sélectionner les objets avec les manettes VR (en utilisant la fonction pick de Ramy). | src/xr/controllers.js | 3 |
| 59 | Garder le mode normal si la VR n'est pas disponible. | src/xr/ | 1 |
| 60 | Préparer les icônes de l'application et vérifier le manifest et le HTTPS. | assets/icons/, manifest.json | 2 |
| 84 | Demande du superviseur — trames perdues animées (arrêt à mi-câble, rouge, disparition) ; vitesse ×0,25 dans le panneau VR. | src/render/packetAnimator.js, src/xr/vrPanel.js | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **11 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `assets/icons/icon-180.png` | nouveau | n° 60 |
| `assets/icons/icon-192.png` | nouveau | n° 60 |
| `assets/icons/icon-512.png` | nouveau | n° 60 |
| `assets/icons/icon-maskable-512.png` | nouveau | n° 60 |
| `src/render/packetAnimator.js` | modifié | n° 84 |
| `src/xr/controllers.js` | nouveau | n° 58 |
| `src/xr/session.js` | modifié | n° 59 |
| `src/xr/vrPanel.js` | modifié | n° 58 |
| `tools/make-icons.mjs` | nouveau | n° 60 |
| `manifest.json` | modifié | n° 60 |
| `package.json` | modifié | n° 60 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s5-manettes-icones
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S5/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S5\depot\* . -Recurse -Force`

`git status` doit lister exactement les 11 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

En VR émulée : la gâchette sur un bouton du panneau l'actionne, sur un équipement le sélectionne. Sans émulateur : bouton « VR indisponible » grisé, tout le reste fonctionne. Application → Manifest : les icônes s'affichent. Superviseur : scénario « Débit », étape 3 : la trame perdue s'arrête en rouge au milieu du câble puis disparaît ; en VR, le bouton de vitesse passe par ×0,25.

### 4. Un commit par tâche

```bash
git add src/xr/controllers.js src/xr/vrPanel.js
git commit -m "S5 n°58 : sélection avec les manettes VR"

git add src/xr/session.js
git commit -m "S5 n°59 : repli en mode classique sans VR"

git add assets/icons/icon-180.png assets/icons/icon-192.png assets/icons/icon-512.png assets/icons/icon-maskable-512.png tools/make-icons.mjs manifest.json package.json
git commit -m "S5 n°60 : icônes de l'application et manifest complet"

git add src/render/packetAnimator.js
git commit -m "S5 n°84 : trames perdues animées et vitesse ×0,25 en VR"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s5-manettes-icones
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s5-manettes-icones
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **86 tests réussis**.

