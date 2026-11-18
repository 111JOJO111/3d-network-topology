# Poste de soutenance et plan B (tâche n° 79)

Tâche hors dépôt : rien à pousser sur GitHub. Objectif : que la démonstration réussisse même si le réseau de la salle tombe.

## Poste de soutenance — à vérifier la veille, puis une heure avant

- [ ] Chrome à jour ; le site s'ouvre par son URL HTTPS.
- [ ] Sans l'extension VR (ou avec `?backend=webgpu` dans l'adresse) : la pastille en bas à droite de la scène indique **WebGPU**.
- [ ] Extension **Immersive Web Emulator** installée et testée : entrée en VR (message « VR WebGPU (pont pour émulateur) »), gâchette sur les deux panneaux, sortie. La pastille reste « WebGPU » : la VR passe aussi par WebGPU (`docs/vr-webgpu.md`). Savoir expliquer au jury les trois voies (native, pont, WebGL 2).
- [ ] Le dernier travail « Vérification HTTPS / TLS » de la CI est vert ; savoir lire son tableau (version TLS, certificat, HSTS).
- [ ] Un réseau construit dans l'éditeur est enregistré dans « Mes réseaux » et exporté en JSON sur la clé USB.
- [ ] Le site a été ouvert une fois sur ce poste avec connexion : il est donc en cache (Application → Cache storage).
- [ ] Essai hors ligne réussi : Wi-Fi coupé, rechargement de la page.
- [ ] Application installée (PWA) : elle s'ouvre depuis son icône.
- [ ] Résolution du vidéoprojecteur testée ; zoom du navigateur réglé pour que le texte soit lisible du fond de la salle.
- [ ] Mise en veille, notifications et mises à jour automatiques désactivées ; chargeur branché.
- [ ] Un smartphone chargé, avec le site déjà ouvert, pour montrer la navigation tactile.

## Déroulé de la démonstration (les six étapes du cahier des charges)

| # | Étape | Qui parle | Vérifié |
| --- | --- | --- | --- |
| 1 | Ouvrir l'URL HTTPS : chargement sans installation | | ☐ |
| 2 | Installer la PWA ; montrer qu'un refus n'empêche rien | | ☐ |
| 3 | Explorer la topologie, sélectionner deux hôtes, lancer un ping | | ☐ |
| 4 | ARP puis ICMP ; pause, pas à pas, inspection ; un scénario DNS, DHCP ou TCP | | ☐ |
| 5 | Vitesse, réinitialisation ; rechargement hors ligne | | ☐ |
| 6 | Immersive Web Emulator : entrer en VR, sortir ; repli classique sans XR | | ☐ |
| 7 ★ | Débit (câbles colorés, fiche technique), Diagnostic (« Tout corriger »), éditeur (construire un petit réseau en direct) | | ☐ |

Deux répétitions à quatre sont prévues dans le plan : chronométrer chacune.

## Plan B

| Panne | Solution préparée |
| --- | --- |
| Pas de réseau dans la salle | l'application est en cache sur le poste : elle s'ouvre hors ligne |
| Le cache a été vidé | servir la copie locale : décompresser l'archive de la release v1.0, puis `python -m http.server 8080` dans le dossier et ouvrir `http://localhost:8080` |
| L'émulateur VR ne répond pas | montrer la séquence VR de la vidéo, en copie locale |
| Le poste tombe en panne | second ordinateur préparé à l'identique ; clé USB avec l'archive du site et la vidéo |
| Le vidéoprojecteur ne fonctionne pas | passer la vidéo sur l'écran du portable ; diapositives imprimées |

À préparer sur une clé USB :

- [ ] `3d-network-topology-v1.0.zip` (page Releases du dépôt) ;
- [ ] la vidéo finale en MP4 ;
- [ ] le cahier conceptuel et le manuel en PDF.
