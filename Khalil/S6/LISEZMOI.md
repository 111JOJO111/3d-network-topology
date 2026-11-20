# Khalil — S6 : Stabilisation et hors ligne (7–13 déc)

**Objectif du sprint.** Tester, corriger, faire marcher l'appli sans internet et écrire la documentation. Ajouts demandés par le superviseur : diagnostic du réseau, fiche technique, scénarios ARP et traceroute.

**Résultat attendu le dimanche.** Un membre qui n'a pas codé la démo la rejoue entièrement sans aide. Version v1.0-rc taguée. Laboratoire, côté moteur : VLAN, sécurité de port, ACL, NAT et pare-feu à états, avec leurs scénarios.

**Jalon.** Gel des fonctionnalités (13 déc)

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 66 | Finaliser le diagramme de classes. | docs/conception/ | 2 |
| 67 | Écrire des tests qui vérifient que rien n'a cassé dans le moteur. | tests/ | 2 |
| 68 | Documenter la simulation et ses protocoles (ARP, TCP, routage). | docs/ | 2 |
| 85 | Demande du superviseur — moteur de diagnostic (adressage, passerelles, routes, câblage, services, performances) avec corrections automatiques ; scénario « Diagnostic », tests et documentation. | src/sim/diagnostic.js, scenarios/diagnostic.json, tests/diagnostic.test.js, docs/diagnostic.md | 4 |
| 86 | Demande du superviseur — scénario ARP détaillé : diffusion, cache, absence de réponse, passerelle. | scenarios/arp.json | 1 |
| 94 | Demande du superviseur — laboratoire : moteur réseau des équipements administrables. VLAN 802.1Q (accès, trunk, VLAN natif) et sous-interfaces de routeur (router-on-a-stick), interfaces éteintes (shutdown / err-disabled), listes d'accès (ACL) avec compteurs, NAT statique et PAT, nouveau type d'équipement « pare-feu » à états (zones inside / dmz / outside, sessions). Scénario Pare-feu et NAT, tests. | src/sim/security.js, src/sim/devices/firewall.js, src/sim/devices/router.js, src/sim/devices/host.js, src/sim/network.js, src/sim/protocols/arp.js, src/sim/protocols/tcp.js, src/sim/catalog.js, src/sim/scenario.js, src/sim/diagnostic.js, src/sim/builder.js, scenarios/pare-feu.json, tests/lab.test.js | 5 |

Total : **16 points**.

## Ce que contient ce dossier

`depot/` — **39 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `docs/conception/classes.md` | nouveau | n° 66 |
| `docs/diagnostic.md` | nouveau | n° 85 |
| `docs/format-scenario.md` | modifié | n° 94 |
| `docs/protocoles/arp.md` | nouveau | n° 68 |
| `docs/protocoles/routage.md` | nouveau | n° 68 |
| `docs/protocoles/tcp.md` | nouveau | n° 68 |
| `docs/simulation.md` | nouveau | n° 68 |
| `scenarios/arp.json` | nouveau | n° 86 |
| `scenarios/diagnostic.json` | nouveau | n° 85 |
| `scenarios/pare-feu.json` | nouveau | n° 94 |
| `src/sim/catalog.js` | modifié | n° 94 |
| `src/sim/devices/firewall.js` | nouveau | n° 94 |
| `src/sim/devices/host.js` | modifié | n° 94 |
| `src/sim/devices/router.js` | modifié | n° 94 |
| `src/sim/diagnostic.js` | nouveau | n° 85 |
| `src/sim/network.js` | modifié | n° 94 |
| `src/sim/protocols/arp.js` | modifié | n° 94 |
| `src/sim/protocols/tcp.js` | modifié | n° 94 |
| `src/sim/scenario.js` | modifié | n° 94 |
| `src/sim/security.js` | nouveau | n° 94 |
| `tests/diagnostic.test.js` | nouveau | n° 85 |
| `tests/golden/arp.txt` | nouveau | n° 67 |
| `tests/golden/debit.txt` | nouveau | n° 67 |
| `tests/golden/dhcp.txt` | nouveau | n° 67 |
| `tests/golden/diagnostic.txt` | nouveau | n° 67 |
| `tests/golden/dns.txt` | nouveau | n° 67 |
| `tests/golden/http.txt` | nouveau | n° 67 |
| `tests/golden/pare-feu.txt` | nouveau | n° 94 |
| `tests/golden/ping.txt` | nouveau | n° 67 |
| `tests/golden/routage.txt` | nouveau | n° 67 |
| `tests/golden/securite-port.txt` | nouveau | n° 94 |
| `tests/golden/tcp.txt` | nouveau | n° 67 |
| `tests/golden/topologie-demo.txt` | nouveau | n° 67 |
| `tests/golden/traceroute.txt` | nouveau | n° 67 |
| `tests/golden/udp.txt` | nouveau | n° 67 |
| `tests/golden/vlan.txt` | nouveau | n° 94 |
| `tests/helpers.js` | modifié | n° 94 |
| `tests/lab.test.js` | nouveau | n° 94 |
| `tests/regression.test.js` | nouveau | n° 67 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Khalil/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/khalil-s6-classes-diagnostic
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Khalil/S6/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Khalil\S6\depot\* . -Recurse -Force`

`git status` doit lister exactement les 39 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

`npm test` joue chaque scénario du catalogue et le compare à sa trace de référence (tests/golden/). Superviseur : tests/diagnostic.test.js ; scénario « Diagnostic » : les pings échouent, puis réussissent une fois tout corrigé. Scénario « ARP » : la 2ᵉ étape n'envoie plus de requête ARP. Laboratoire : `npm test` couvre les VLAN, les ACL, le NAT et le pare-feu (tests/lab.test.js) ; les scénarios « VLAN » et « Pare-feu et NAT » se jouent jusqu'au bout.

### 4. Un commit par tâche

```bash
git add docs/conception/classes.md
git commit -m "S6 n°66 : diagramme de classes"

git add tests/golden/arp.txt tests/golden/debit.txt tests/golden/dhcp.txt tests/golden/diagnostic.txt tests/golden/dns.txt tests/golden/http.txt tests/golden/ping.txt tests/golden/routage.txt tests/golden/tcp.txt tests/golden/topologie-demo.txt tests/golden/traceroute.txt tests/golden/udp.txt tests/regression.test.js
git commit -m "S6 n°67 : tests de non-régression du moteur"

git add docs/protocoles/arp.md docs/protocoles/routage.md docs/protocoles/tcp.md docs/simulation.md
git commit -m "S6 n°68 : documentation de la simulation, ARP, TCP et routage"

git add docs/diagnostic.md scenarios/diagnostic.json src/sim/diagnostic.js tests/diagnostic.test.js
git commit -m "S6 n°85 : diagnostic du réseau et scénario Diagnostic"

git add scenarios/arp.json
git commit -m "S6 n°86 : scénario ARP"

git add docs/format-scenario.md scenarios/pare-feu.json src/sim/catalog.js src/sim/devices/firewall.js src/sim/devices/host.js src/sim/devices/router.js src/sim/network.js src/sim/protocols/arp.js src/sim/protocols/tcp.js src/sim/scenario.js src/sim/security.js tests/golden/pare-feu.txt tests/golden/securite-port.txt tests/golden/vlan.txt tests/helpers.js tests/lab.test.js
git commit -m "S6 n°94 : laboratoire : VLAN, ACL, NAT et pare-feu dans le moteur"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/khalil-s6-classes-diagnostic
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/khalil-s6-classes-diagnostic
```

## Ordre de fusion conseillé cette semaine

1. **Khalil (toi)**  →  2. Aziz  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Tu fusionnes en premier : les autres attendent ta partie.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **121 tests réussis**.

## Attention : fichier partagé

`src/sim/scenario.js` fait partie des contrats communs : la pull request doit être **approuvée par les quatre**. La version fournie ici est celle de la fin de la semaine, toutes parties fusionnées.

