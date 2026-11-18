# Aziz — S4 : Catalogue de protocoles (23–29 nov)

**Objectif du sprint.** Ajouter DHCP, UDP, DNS et TCP, et démarrer le mode VR.

**Résultat attendu le dimanche.** Six protocoles au choix, chacun avec ses explications et ses tests. On entre et on sort de la VR dans l'émulateur.

## Tes tâches cette semaine

| N° | Tâche | Fichiers concernés (plan) | Points |
| --- | --- | --- | --- |
| 44 | Coder UDP (envoi sans connexion). | protocols/udp.js | 2 |
| 45 | Coder DNS : trouver l'adresse IP d'un nom de domaine, en passant par UDP. | protocols/dns.js | 3 |
| 46 | Créer les scénarios UDP et DNS avec leurs tests et leurs textes d'explication. | scenarios/, tests/ | 2 |

Total : **7 points**.

## Ce que contient ce dossier

`depot/` — **6 fichiers** à copier dans le dépôt, rangés exactement comme dans le dépôt :

| Fichier | État | Tâche |
| --- | --- | --- |
| `scenarios/dns.json` | nouveau | n° 46 |
| `scenarios/udp.json` | nouveau | n° 46 |
| `src/sim/protocols/dns.js` | nouveau | n° 45 |
| `src/sim/protocols/udp.js` | nouveau | n° 44 |
| `tests/dns.test.js` | nouveau | n° 46 |
| `tests/udp.test.js` | nouveau | n° 46 |

« nouveau » : le fichier n'existait pas. « modifié » : il remplace la version de la semaine précédente (c'est le fichier complet, pas un correctif).

## Pousser sur GitHub

Les commandes supposent que ce dossier `Aziz/` et le dépôt cloné `3d-network-topology/` sont **côte à côte** (voir `../GUIDE-GITHUB.md`). Elles se tapent dans **Git Bash**, depuis le dossier du dépôt.

### 1. Partir d'un `main` à jour et créer ta branche

```bash
cd 3d-network-topology
git checkout main
git pull --rebase origin main
git checkout -b feature/aziz-s4-udp-dns
```

### 2. Copier tes fichiers de la semaine

```bash
cp -r ../Aziz/S4/depot/. .
git status
```

PowerShell (au lieu de `cp`) : `Copy-Item ..\Aziz\S4\depot\* . -Recurse -Force`

`git status` doit lister exactement les 6 fichiers du tableau ci-dessus.

### 3. Vérifier

```bash
npm test
npm start        # puis ouvrir http://localhost:8080 ; Ctrl+C pour arrêter
```

Scénarios UDP et DNS dans la liste : port ouvert puis port fermé (ICMP Port Unreachable) ; résolution, nom inexistant, puis réponse tirée du cache.

### 4. Un commit par tâche

```bash
git add src/sim/protocols/udp.js
git commit -m "S4 n°44 : UDP : envoi sans connexion"

git add src/sim/protocols/dns.js
git commit -m "S4 n°45 : DNS : résolution de nom par UDP"

git add scenarios/dns.json scenarios/udp.json tests/dns.test.js tests/udp.test.js
git commit -m "S4 n°46 : scénarios UDP et DNS, avec leurs tests"
```

`git status` doit ensuite afficher « nothing to commit, working tree clean ».

### 5. Envoyer ta branche et ouvrir la pull request

```bash
git push -u origin feature/aziz-s4-udp-dns
```

Git affiche un lien « Create a pull request » : ouvre-le (ou va sur GitHub → **Compare & pull request**), vérifie que la cible est `main`, décris ce que tu livres, puis crée la pull request. La CI lance les tests ; la fusion se fait le **mercredi ou le dimanche**, une fois la relecture approuvée.

### 6. Après la fusion

```bash
git checkout main
git pull --rebase origin main
git branch -d feature/aziz-s4-udp-dns
```

## Ordre de fusion conseillé cette semaine

1. Khalil  →  2. **Aziz (toi)**  →  3. Ayoub  →  4. Ramy

Dans cet ordre, les tests passent et l'application démarre après chaque fusion. Un test qui dépend de la partie d'un autre, pas encore fusionnée, s'affiche « skipped » : il s'activera tout seul. Attends que Khalil ait fusionné, puis mets ta branche à jour avant de fusionner : `git pull --rebase origin main` puis `git push --force-with-lease`.

À la fin de la semaine, une fois les parties de chacun fusionnées, `npm test` annonce **67 tests réussis**.

