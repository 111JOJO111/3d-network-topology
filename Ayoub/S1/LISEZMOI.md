# Ayoub — S1 : Fondations et contrats (2–8 nov)

**Objectif du sprint.** Mettre en place le dépôt et la scène 3D, et se mettre d'accord sur les formats communs pour que chacun puisse ensuite travailler seul.

**Résultat attendu le dimanche.** Le site s'ouvre sur GitHub Pages et affiche une topologie. Les formats communs (contrats) et leurs mocks sont validés par les quatre. Le moteur de rendu est choisi.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 13 | Créer le dépôt GitHub, le fichier CODEOWNERS (qui possède quoi) et protéger la branche main. | .github/ | 2 |
| 14 | Activer GitHub Pages en HTTPS et la CI qui lance les tests et déploie automatiquement. | .github/ | 2 |
| 15 | Créer main.js, manifest.json et un premier sw.js minimal. | main.js, manifest.json, sw.js | 1 |
| 16 | Tester WebXR dans l'émulateur pour choisir le moteur de rendu (WebGPU ou WebGL 2). | (test hors dépôt) | 3 |

Total : **8 points**.

## Ce que contient ce dossier

`depot/` — **17 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `.gitattributes` | nouveau | n° 13 |
| `.github/CODEOWNERS` | nouveau | n° 13 |
| `.github/pull_request_template.md` | nouveau | n° 13 |
| `.github/workflows/ci.yml` | nouveau | n° 14 |
| `.gitignore` | nouveau | n° 13 |
| `.nojekyll` | nouveau | n° 14 |
| `LICENSE` | nouveau | n° 13 |
| `assets/icons/favicon.svg` | nouveau | n° 15 |
| `docs/choix-moteur-rendu.md` | nouveau | n° 16 |
| `main.js` | nouveau | n° 15 |
| `src/xr/index.js` | nouveau | n° 16 |
| `src/xr/support.js` | nouveau | n° 16 |
| `sw.js` | nouveau | n° 15 |
| `tools/serve.mjs` | nouveau | n° 15 |
| `README.md` | nouveau | n° 13 |
| `manifest.json` | nouveau | n° 15 |
| `package.json` | nouveau | n° 13 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

**Cette semaine est particulière : c'est toi qui crées le dépôt.** Fais d'abord l'étape A de `../GUIDE-GITHUB.md`, section 2 (créer un dépôt vide et public sur GitHub). Ensuite, depuis le dossier qui contient ton dossier `Ayoub/` :

```bash
mkdir 3d-network-topology && cd 3d-network-topology
git init -b main
cp -r ../Ayoub/S1/depot/. .
npm test
```

Puis un commit par tâche :

```bash
git add .gitattributes .github/CODEOWNERS .github/pull_request_template.md .gitignore LICENSE README.md package.json
git commit -m "S1 n°13 : création du dépôt, CODEOWNERS, règles d'équipe"

git add .github/workflows/ci.yml .nojekyll
git commit -m "S1 n°14 : CI : tests et déploiement GitHub Pages"

git add assets/icons/favicon.svg main.js sw.js tools/serve.mjs manifest.json
git commit -m "S1 n°15 : main.js, manifest.json et premier sw.js"

git add docs/choix-moteur-rendu.md src/xr/index.js src/xr/support.js
git commit -m "S1 n°16 : vérification WebXR et choix du moteur de rendu"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

Enfin, le premier envoi (remplace `<compte>` et `<depot>`) :

```bash
git remote add origin https://github.com/<compte>/<depot>.git
git push -u origin main
```

Termine par les réglages du dépôt, étapes C à E du guide : GitHub Pages, invitation des trois autres, protection de `main`, identifiants de CODEOWNERS.

### Vérifier

Après le premier push : l'onglet Actions montre le workflow « CI ». Une fois les quatre parties de S1 fusionnées, le site s'ouvre sur l'adresse GitHub Pages et la pastille « WebXR : disponible / indisponible » s'affiche en haut.

## Ordre de fusion conseillé cette semaine

1. **Ayoub (toi)**  →  2. Khalil  →  3. Aziz  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **14 tests réussis**.

