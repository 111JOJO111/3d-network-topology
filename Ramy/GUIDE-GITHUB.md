# Guide GitHub — Ramy (Rami Driouech)

Ce dossier contient ton travail des sept semaines du projet **3D network topology**, réparti d'après le plan
(`Plan_3D_Network_Topology.xlsx`), et tout ce qu'il faut pour le pousser sur GitHub.

```
Ramy/
  GUIDE-GITHUB.md        ce guide (à lire une fois)
  S1/ … S7/              une semaine = un dossier
    LISEZMOI.md          tes tâches de la semaine et les commandes exactes à taper
    depot/               tes fichiers, rangés comme dans le dépôt : à copier tels quels
    hors-depot/          (parfois) aide pour les tâches qui ne vont pas dans le dépôt
```

Chaque semaine, ouvre `S<n>/LISEZMOI.md` et suis-le. Ce guide explique le reste : l'installation, les règles de
l'équipe et quoi faire quand Git se plaint.

## 1. Installation (une seule fois)

1. **Git** : installer [Git for Windows](https://git-scm.com/download/win) en gardant les options par défaut. Il fournit **Git Bash**,
   le terminal dans lequel se tapent toutes les commandes de ce guide. (macOS et Linux : le Terminal habituel.)
2. **Node.js** 20 ou plus récent : [nodejs.org](https://nodejs.org), version LTS. Il sert à lancer les tests et le serveur local.
3. Un **compte GitHub**.
4. Te présenter à Git, avec l'adresse e-mail de ton compte GitHub :

```bash
git config --global user.name "Rami Driouech"
git config --global user.email "ton-adresse@exemple.com"
git --version && node --version      # vérification
```

Au premier `git push`, une fenêtre du navigateur s'ouvre pour te connecter à GitHub : accepte, c'est fait une fois pour toutes.

## 2. Récupérer le dépôt (une seule fois)

Ayoub crée le dépôt en S1 et t'invite : accepte l'invitation reçue par e-mail (ou sur github.com/notifications).
Puis, dans le dossier qui contient déjà ton dossier `Ramy/` :

```bash
git clone https://github.com/<compte>/<depot>.git 3d-network-topology
cd 3d-network-topology
npm test
```

Remplace `<compte>/<depot>` par l'adresse que te donne Ayoub.

## 3. Disposition des dossiers

Les commandes de chaque semaine supposent que ton dossier et le dépôt sont **côte à côte** :

```
un-dossier-de-travail/
  Ramy/                ce dossier
  3d-network-topology/     le dépôt cloné
```

Depuis le dépôt, tes fichiers de la semaine 3 sont donc dans `../Ramy/S3/depot/`.

## 4. La routine de chaque semaine

`S<n>/LISEZMOI.md` donne les commandes exactes, avec les bons noms de branche et de fichiers. Le principe est toujours le même :

| Étape | Commande | Pourquoi |
| --- | --- | --- |
| 1. Partir à jour | `git checkout main` puis `git pull --rebase origin main` | récupérer ce que les autres ont fusionné |
| 2. Créer sa branche | `git checkout -b feature/ramy-<sujet>` | on ne travaille jamais directement sur `main` |
| 3. Copier ses fichiers | `cp -r ../Ramy/S<n>/depot/. .` | le point final copie aussi les fichiers cachés (`.github`, `.gitignore`) |
| 4. Vérifier | `npm test` puis `npm start` | ne pousser que ce qui fonctionne |
| 5. Valider | `git add …` puis `git commit -m "…"` | un commit par tâche du plan |
| 6. Envoyer | `git push -u origin feature/ramy-<sujet>` | la branche arrive sur GitHub |
| 7. Pull request | sur GitHub : *Compare & pull request* vers `main` | relecture, tests automatiques |
| 8. Fusion | bouton *Merge* une fois approuvée | le mercredi ou le dimanche |
| 9. Nettoyer | `git checkout main`, `git pull --rebase origin main`, `git branch -d feature/…` | repartir propre |

**Push quotidien.** Le plan demande un push par jour sur ta branche. Si tu étales le travail sur la semaine, fais les étapes 5 et 6
tâche par tâche : après le premier `git push -u …`, un simple `git push` suffit.

**Tu veux comprendre ou adapter le code avant de le pousser ?** C'est le but : lis tes fichiers, lance `npm start`, modifie ce que tu
veux dans le dépôt, puis `npm test`. Les fichiers de `depot/` sont un point de départ qui fonctionne, pas une obligation.

## 5. Règles de l'équipe (onglet « Fichiers » du plan)

- **Chacun ne modifie que ses fichiers.** La liste est dans `.github/CODEOWNERS`.
- **Un bug dans le fichier d'un autre = une issue GitHub** assignée à son propriétaire, jamais une correction directe.
- **Contrats communs** — `src/sim/events.js`, le format des scénarios, `index.html` : toute modification passe par une pull request
  approuvée par les quatre.
- **Branches** : `feature/<membre>-<sujet>`. **Fusion dans `main`** le mercredi et le dimanche, après `git pull --rebase origin main`.
- **`main` reste exécutable** : on ne fusionne que si les tests sont verts.
- **Ordre de fusion** : chaque `LISEZMOI.md` indique l'ordre conseillé de la semaine. Certaines parties dépendent d'une autre
  (un test de switch a besoin du comportement d'un PC, par exemple) ; dans l'ordre indiqué, les tests passent après chaque fusion.

## 6. Quand Git se plaint

| Message ou situation | Ce qu'il faut faire |
| --- | --- |
| `! [rejected] … (non-fast-forward)` au push | ta branche a du retard : `git pull --rebase origin main`, puis `git push --force-with-lease` (uniquement sur **ta** branche) |
| `CONFLICT` pendant un rebase | ouvre le fichier, garde la bonne version entre les marques `<<<<<<<` et `>>>>>>>`, puis `git add <fichier>` et `git rebase --continue`. Pour abandonner : `git rebase --abort`. Un conflit sur un fichier qui n'est pas à toi signale que quelqu'un a touché au fichier d'un autre : parlez-en. |
| Tu as travaillé sur `main` par erreur (pas encore de commit) | `git checkout -b feature/ramy-<sujet>` : tes modifications suivent dans la nouvelle branche |
| Tu as copié le mauvais dossier | `git status` pour voir ; `git restore .` annule les fichiers modifiés, `git clean -fd` supprime les fichiers nouveaux **non validés** (attention : définitif) |
| `npm test` échoue juste après la copie | vérifie l'ordre de fusion de la semaine : la partie d'un autre manque peut-être dans `main`. Fais `git pull --rebase origin main` et relance |
| `warning: LF will be replaced by CRLF` | sans gravité : le fichier `.gitattributes` du dépôt impose les mêmes fins de ligne à tout le monde |
| `Authentication failed` | reconnecte-toi : `git credential-manager github login`, ou installe [GitHub CLI](https://cli.github.com) et lance `gh auth login` |
| `remote: Permission … denied` | tu n'as pas encore accepté l'invitation au dépôt, ou tu pousses sur `main` (protégée) au lieu de ta branche |
| La page ne s'ouvre pas en double-cliquant sur `index.html` | normal : lance `npm start` et ouvre `http://localhost:8080` |

## 7. Lexique

| Mot | Sens |
| --- | --- |
| dépôt (*repository*) | le dossier du projet suivi par Git, sur ton poste et sur GitHub |
| commit | un enregistrement de tes modifications, avec un message |
| branche | une ligne de travail séparée de `main` |
| push / pull | envoyer tes commits vers GitHub / récupérer ceux des autres |
| rebase | rejouer tes commits par-dessus la dernière version de `main` |
| pull request | demande de fusion de ta branche dans `main`, relue par l'équipe |
| CI | les tests lancés automatiquement par GitHub à chaque push |
