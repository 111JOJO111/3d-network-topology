# Aziz — S6 : Stabilisation et hors ligne (7–13 déc)

**Objectif du sprint.** Tester, corriger, faire marcher l'appli sans internet et écrire la documentation. Ajouts demandés par le superviseur : diagnostic du réseau, fiche technique, scénarios ARP et traceroute.

**Résultat attendu le dimanche.** Un membre qui n'a pas codé la démo la rejoue entièrement sans aide. Version v1.0-rc taguée. Laboratoire, côté moteur : VLAN, sécurité de port, ACL, NAT et pare-feu à états, avec leurs scénarios.

**Jalon.** Gel des fonctionnalités (13 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 63 | Tester sur PC et sur deux smartphones, corriger les problèmes d'affichage. | src/render/ | 3 |
| 64 | Finaliser le diagramme de séquence du ping. | docs/conception/ | 1 |
| 65 | Documenter le rendu 3D et ses protocoles (ICMP, UDP, DNS). | docs/ | 2 |
| 87 | Demande du superviseur — scénario traceroute : TTL de 1 à 4 à travers trois routeurs. | scenarios/traceroute.json | 1 |
| 96 | Demande du superviseur — laboratoire : modèle 3D du pare-feu (ports colorés par zone), forme simple de repli, câbles coupés (shutdown, err-disabled) en rouge foncé. | tools/make-models.mjs, assets/models/firewall.glb, src/render/factory.js, src/render/shapes.js, src/render/linkLoad.js | 2 |

Total : **9 points**.

## Ce que contient ce dossier

`depot/` — **13 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `assets/models/firewall.glb` | nouveau | n° 96 |
| `docs/conception/sequence-ping.md` | modifié | n° 64 |
| `docs/protocoles/dns.md` | nouveau | n° 65 |
| `docs/protocoles/icmp.md` | nouveau | n° 65 |
| `docs/protocoles/udp.md` | nouveau | n° 65 |
| `docs/rendu-3d.md` | nouveau | n° 65 |
| `docs/tests-appareils.md` | nouveau | n° 63 |
| `scenarios/traceroute.json` | nouveau | n° 87 |
| `src/render/factory.js` | modifié | n° 96 |
| `src/render/linkLoad.js` | modifié | n° 96 |
| `src/render/scene.js` | modifié | n° 63 |
| `src/render/shapes.js` | modifié | n° 96 |
| `tools/make-models.mjs` | modifié | n° 96 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s6-tests-docs-traceroute
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S6/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S6\depot\* . -Recurse -Force`

`git status` doit lister exactement les 13 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Fenêtre étroite ou téléphone en portrait : toute la topologie reste visible. Remplir docs/tests-appareils.md sur le PC et les deux smartphones. Superviseur : scénario « Traceroute » : R1, R2 puis R3 renvoient « Time Exceeded », puis SRV1 répond. Laboratoire : dans le scénario « Pare-feu et NAT », FW1 est un boîtier rouge à trois ports colorés.

### 4. Un commit par tâche

```bash
git add docs/tests-appareils.md src/render/scene.js
git commit -m "S6 n°63 : corrections d'affichage sur mobile et fiche de tests"

git add docs/conception/sequence-ping.md
git commit -m "S6 n°64 : diagramme de séquence du ping finalisé"

git add docs/protocoles/dns.md docs/protocoles/icmp.md docs/protocoles/udp.md docs/rendu-3d.md
git commit -m "S6 n°65 : documentation du rendu 3D, ICMP, UDP et DNS"

git add scenarios/traceroute.json
git commit -m "S6 n°87 : scénario traceroute"

git add assets/models/firewall.glb src/render/factory.js src/render/linkLoad.js src/render/shapes.js tools/make-models.mjs
git commit -m "S6 n°96 : laboratoire : pare-feu en 3D et câbles coupés"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s6-tests-docs-traceroute
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s6-tests-docs-traceroute
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **121 tests réussis**.

