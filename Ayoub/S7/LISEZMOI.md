# Ayoub — S7 : Livraison (14–20 déc)

**Objectif du sprint.** Produire la vidéo, finir la documentation et préparer la soutenance. Seuls ajouts : ceux demandés par le superviseur (éditeur de topologie, VR en WebGPU, vérification HTTPS).

**Résultat attendu le dimanche.** Tous les livrables sont remis. Deux répétitions de soutenance à quatre.

**Jalon.** v1.0 le 18 déc, remise le 20 déc

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 78 | Publier la version finale v1.0 (18 déc). | .github/ | 1 |
| 79 | Préparer le poste de soutenance (émulateur testé) et un plan B (vidéo locale si pas de réseau). | (hors dépôt) | 3 |
| 92 | Demande du superviseur — VR en WebGPU (voie native, pont pour émulateur, repli WebGL 2), manettes du pont, second panneau VR (Étape, Fiche, Diagnostic), tolérance de visée ; garde-fou contre les boucles entre switchs. | src/xr/gpuBridge.js, src/xr/session.js, src/xr/controllers.js, src/xr/vrInfoPanel.js, docs/vr-webgpu.md | 4 |
| 93 | Demande du superviseur — vérification HTTPS / TLS du site publié, après chaque déploiement et chaque lundi en CI ; fichier ATTRIBUTION. | tools/verify-https.mjs, tests/verify-https.test.js, .github/workflows/ci.yml, ATTRIBUTION.md | 2 |

Total : **10 points**.

## Ce que contient ce dossier

`depot/` — **15 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `.github/workflows/ci.yml` | modifié | n° 93 |
| `.github/workflows/release.yml` | nouveau | n° 78 |
| `ATTRIBUTION.md` | nouveau | n° 93 |
| `docs/choix-moteur-rendu.md` | modifié | n° 92 |
| `docs/lancement-deploiement.md` | modifié | n° 93 |
| `docs/vr-webgpu.md` | nouveau | n° 92 |
| `src/sim/devices/switch.js` | modifié | n° 92 |
| `src/xr/controllers.js` | modifié | n° 92 |
| `src/xr/gpuBridge.js` | nouveau | n° 92 |
| `src/xr/index.js` | modifié | n° 92 |
| `src/xr/session.js` | modifié | n° 92 |
| `src/xr/vrInfoPanel.js` | nouveau | n° 92 |
| `tests/verify-https.test.js` | nouveau | n° 93 |
| `tools/verify-https.mjs` | nouveau | n° 93 |
| `package.json` | modifié | n° 78 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

`hors-depot/` — aide pour les tâches qui ne vont pas dans le dépôt : `checklist-soutenance.md`. Ne pas copier dans le dépôt.

Tâche hors dépôt : n° 79.

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s7-vr-webgpu-release
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S7/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S7\depot\* . -Recurse -Force`

`git status` doit lister exactement les 15 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Après `git push origin v1.0` : l'onglet Actions lance « Release » et la page Releases propose l'archive du site. Superviseur : avec l'émulateur, « Entrer en VR » affiche « VR WebGPU (pont pour émulateur) » ; le panneau de droite (Étape, Fiche, Diagnostic) répond à la gâchette. `node tools/verify-https.mjs https://<compte>.github.io/<dépôt>/` affiche le tableau TLS ; le workflow CI a un travail « Vérification HTTPS / TLS ».

### 4. Un commit par tâche

```bash
git add .github/workflows/release.yml package.json
git commit -m "S7 n°78 : publication de la version 1.0"

git add docs/choix-moteur-rendu.md docs/vr-webgpu.md src/sim/devices/switch.js src/xr/controllers.js src/xr/gpuBridge.js src/xr/index.js src/xr/session.js src/xr/vrInfoPanel.js
git commit -m "S7 n°92 : VR en WebGPU et panneau VR d'informations"

git add .github/workflows/ci.yml ATTRIBUTION.md docs/lancement-deploiement.md tests/verify-https.test.js tools/verify-https.mjs
git commit -m "S7 n°93 : vérification HTTPS/TLS et ATTRIBUTION"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s7-vr-webgpu-release
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s7-vr-webgpu-release
```

### 7. Publier la version 1.0 (jalon du 18 déc)

Une fois toutes les pull requests de S7 fusionnées :

```bash
git checkout main && git pull --rebase origin main
npm test
git tag -a v1.0 -m "Version 1.0"
git push origin v1.0
```

L'étiquette déclenche le workflow « Release » : il relance les tests et crée la release GitHub avec l'archive du site (`3d-network-topology-v1.0.zip`), à garder sur clé USB pour le plan B de la soutenance.

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **122 tests réussis**.

