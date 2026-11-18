# Khalil — S3 : ARP, ICMP et inspection (16–22 nov)

**Objectif du sprint.** Faire marcher le premier vrai scénario : le ping.

**Résultat attendu le dimanche.** On choisit deux PC, on lance un ping, on voit ARP puis ICMP, on met en pause, on avance pas à pas et on inspecte un paquet.

**Jalon.** MVP : ping démontrable (22 nov)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 34 | Coder ARP : trouver l'adresse MAC à partir de l'IP (demande en broadcast, réponse, mémoire cache). | protocols/arp.js | 3 |
| 35 | Coder le comportement d'un PC et d'un routeur simple qui transmet vers la passerelle. | devices/host.js, router.js | 3 |
| 36 | Écrire les tests d'ARP. | tests/arp.test.js | 1 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `simulation.js` | modifié | n° 35 |
| `src/sim/devices/host.js` | nouveau | n° 35 |
| `src/sim/devices/router.js` | nouveau | n° 35 |
| `src/sim/network.js` | modifié | n° 35 |
| `src/sim/protocols/arp.js` | nouveau | n° 34 |
| `tests/arp.test.js` | nouveau | n° 36 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s3-arp-hote-routeur
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S3/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S3\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénario Ping (une fois les parties d'Aziz et d'Ayoub fusionnées) : ARP Request en diffusion, ARP Reply, puis le ping ; le cache ARP de PC1 se remplit dans le panneau d'infos.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/arp.js
git commit -m "S3 n°34 : ARP : requête, réponse, cache"

git add simulation.js src/sim/devices/host.js src/sim/devices/router.js src/sim/network.js
git commit -m "S3 n°35 : comportement du PC et du routeur simple"

git add tests/arp.test.js
git commit -m "S3 n°36 : tests d'ARP"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s3-arp-hote-routeur
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s3-arp-hote-routeur
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **50 tests réussis**.

