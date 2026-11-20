# 3D network topology — livraison

Ce dossier contient le projet complet, en état de marche, et le même travail réparti entre les quatre membres,
semaine par semaine, d'après `Plan_3D_Network_Topology.xlsx`.

```
projet-complet/          le projet complet (état de fin de S7) : pour l'essayer tout de suite
Ramy/  Aziz/  Khalil/  Ayoub/
  GUIDE-GITHUB.md        installation, règles de l'équipe, dépannage Git
  S1/ … S7/
    LISEZMOI.md          tâches de la semaine et commandes exactes pour pousser sur GitHub
    depot/               les fichiers du membre pour cette semaine, rangés comme dans le dépôt
    hors-depot/          (S7) aide pour les tâches hors dépôt : vidéo, soutenance
```

## Essayer le projet complet

Il faut [Node.js](https://nodejs.org) 20 ou plus récent. Rien d'autre à installer.

```bash
cd projet-complet
npm start        # puis ouvrir http://localhost:8080 dans Chrome
npm test         # 122 tests automatiques
```

Ouvrir `index.html` par un double-clic ne fonctionne pas : le navigateur refuse de charger les modules depuis le disque.

## Comment la répartition fonctionne

- Chaque dossier `Membre/S<n>/depot/` contient **uniquement les fichiers que ce membre crée ou modifie cette semaine-là**, selon
  l'onglet « Plan » (tâches) et l'onglet « Fichiers » (propriétaires).
- Un fichier « modifié » est fourni **en entier** : il remplace la version de la semaine précédente.
- En copiant les dossiers dans l'ordre (S1 des quatre membres, puis S2…), on reconstruit exactement le dépôt de chaque fin de
  semaine. À la fin de S7, on obtient exactement le dossier `projet-complet/`.
- **Chaque fin de semaine donne une application qui fonctionne** et correspond au « résultat attendu le dimanche » du plan.

| Sprint | Dates | Phase | Ordre de fusion conseillé | Tests réussis en fin de semaine |
| --- | --- | --- | --- | --- |
| S1 | 2–8 nov | Fondations et contrats | Ayoub → Khalil → Aziz → Ramy | 14 |
| S2 | 9–15 nov | Scène 3D et moteur d'évènements | Khalil → Aziz → Ayoub → Ramy | 30 |
| S3 | 16–22 nov | ARP, ICMP et inspection | Khalil → Aziz → Ayoub → Ramy | 50 |
| S4 | 23–29 nov | Catalogue de protocoles | Khalil → Aziz → Ayoub → Ramy | 67 |
| S5 | 30 nov–6 déc | VR, PWA et extensions | Khalil → Aziz → Ayoub → Ramy | 86 |
| S6 | 7–13 déc | Stabilisation et hors ligne | Khalil → Aziz → Ayoub → Ramy | 121 |
| S7 | 14–20 déc | Livraison | Khalil → Aziz → Ayoub → Ramy | 148 |

Nombre de fichiers par membre et par semaine (« — » : uniquement des tâches hors dépôt) :

| Membre | S1 | S2 | S3 | S4 | S5 | S6 | S7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ramy | 8 | 6 | 5 | 6 | 9 | 12 | 19 |
| Aziz | 16 | 9 | 6 | 6 | 4 | 13 | 6 |
| Khalil | 13 | 9 | 6 | 3 | 15 | 39 | 19 |
| Ayoub | 17 | 6 | 5 | 3 | 11 | 7 | 16 |

## Compléments demandés par le superviseur (S5 à S7)

Les fonctionnalités ajoutées à la demande du superviseur sont réparties sur S5, S6 et S7, chacune chez le membre
responsable de la partie concernée ; dans chaque `LISEZMOI.md`, ces tâches commencent par « Demande du superviseur ».
Le détail, tâche par tâche, est dans `PLANNING.md`.

| Semaine | Ajouts |
| --- | --- |
| S5 | débit : vitesse des liens, temps d'émission, files d'attente, pertes, TCP à fenêtre glissante, câbles colorés, scénario « Débit » |
| S6 | diagnostic avec corrections en un clic, fiche technique et ports en direct, onglets, scénarios « ARP », « Traceroute » et « Diagnostic » |
| S7 | éditeur de topologie, VR en WebGPU (et second panneau VR), vérification HTTPS/TLS hebdomadaire en CI, ATTRIBUTION.md |

## Par où commencer

1. **Ayoub** crée le dépôt GitHub avec son dossier `S1` (`Ayoub/GUIDE-GITHUB.md`, section 2) et invite les trois autres.
2. Chaque membre lit son `GUIDE-GITHUB.md` une fois, puis suit `S<n>/LISEZMOI.md` chaque semaine.

## À compléter par l'équipe

| Quoi | Où |
| --- | --- |
| Noms d'utilisateur GitHub (`@GITHUB-RAMY`, `@GITHUB-AZIZ`, `@GITHUB-KHALIL`, `@GITHUB-AYOUB`) | `.github/CODEOWNERS` |
| Adresse du dépôt et du site (`<compte>/<depot>`) | `README.md`, `docs/manuel.md`, `docs/lancement-deploiement.md` |
| Résultats du test WebXR dans le vrai émulateur et sur un vrai casque (voie WebGPU « native ») | `docs/choix-moteur-rendu.md`, `docs/vr-webgpu.md` |
| Essais sur un PC et deux smartphones | `docs/tests-appareils.md` |
| Audit Lighthouse du site déployé | `docs/lighthouse.md` |
| Affichage WebGPU à constater sur un vrai poste (pastille « WebGPU » dans la scène) | `docs/choix-moteur-rendu.md` |
| Voix off de la vidéo, séquences PWA et hors ligne à tourner (premier montage muet fourni) | `Aziz/S7/hors-depot/` |
| Vidéo de 5 minutes et préparation de la soutenance | `Ramy/S7/hors-depot/`, `Aziz/S7/hors-depot/`, `Ayoub/S7/hors-depot/` |
