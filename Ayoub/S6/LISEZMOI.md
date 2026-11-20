# Ayoub — S6 : Stabilisation et hors ligne (7–13 déc)

**Objectif du sprint.** Tester, corriger, faire marcher l'appli sans internet et écrire la documentation. Ajouts demandés par le superviseur : diagnostic du réseau, fiche technique, scénarios ARP et traceroute.

**Résultat attendu le dimanche.** Un membre qui n'a pas codé la démo la rejoue entièrement sans aide. Version v1.0-rc taguée. Laboratoire, côté moteur : VLAN, sécurité de port, ACL, NAT et pare-feu à états, avec leurs scénarios.

**Jalon.** Gel des fonctionnalités (13 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 69 | Mettre en cache tous les fichiers et tester l'appli sans internet sur GitHub Pages. | sw.js | 3 |
| 70 | Lancer un audit Lighthouse (qualité PWA) et noter les résultats. | docs/ | 1 |
| 71 | Documenter le lancement en local et le déploiement. | docs/ | 2 |
| 95 | Demande du superviseur — laboratoire : switch administrable. Ports d'accès et trunk étiquetés 802.1Q, table MAC par VLAN, sécurité de port (maximum, sticky, violation shutdown / restrict / protect). Scénarios VLAN et Sécurité de port, ajoutés au catalogue. | src/sim/devices/switch.js, scenarios/securite-port.json, scenarios/vlan.json, scenarios/index.json | 3 |

Total : **9 points**.

## Ce que contient ce dossier

`depot/` — **7 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/lancement-deploiement.md` | nouveau | n° 71 |
| `docs/lighthouse.md` | nouveau | n° 70 |
| `scenarios/securite-port.json` | nouveau | n° 95 |
| `scenarios/vlan.json` | nouveau | n° 95 |
| `src/sim/devices/switch.js` | modifié | n° 95 |
| `sw.js` | modifié | n° 69 |
| `scenarios/index.json` | modifié — fichier partagé, dernière modification par Ramy | n° 95 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Ayoub/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/ayoub-s6-hors-ligne-docs
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Ayoub/S6/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Ayoub\S6\depot\* . -Recurse -Force`

`git status` doit lister exactement les 7 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Sur le site déployé : Application → Cache storage contient `3dnt-…` ; Network → Offline puis F5 : l'application se recharge. Remplir docs/lighthouse.md. Laboratoire : le scénario « Sécurité de port » coupe le port de l'intrus (câble rouge foncé à partir de la version d'Aziz).

### 4. Un commit par tâche

```bash
git add sw.js
git commit -m "S6 n°69 : Service Worker complet : cache et hors ligne"

git add docs/lighthouse.md
git commit -m "S6 n°70 : fiche d'audit Lighthouse"

git add docs/lancement-deploiement.md
git commit -m "S6 n°71 : documentation du lancement local et du déploiement"

git add scenarios/securite-port.json scenarios/vlan.json src/sim/devices/switch.js scenarios/index.json
git commit -m "S6 n°95 : laboratoire : switch administrable (VLAN, sécurité de port) et ses scénarios"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/ayoub-s6-hors-ligne-docs
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/ayoub-s6-hors-ligne-docs
```

### 7. Étiqueter la version candidate

Le plan prévoit une version `v1.0-rc` en fin de S6. Une fois les quatre parties de S6 fusionnées :

```bash
git checkout main && git pull --rebase origin main
npm test
git tag -a v1.0-rc -m "Version candidate : gel des fonctionnalités"
git push origin v1.0-rc
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. Aziz  →  3. **Ayoub (toi)**  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil et Aziz aient fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **121 tests réussis**.

## Attention : fichier partagé

`scenarios/index.json` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

