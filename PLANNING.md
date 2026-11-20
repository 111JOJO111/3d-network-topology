# Planning S1 → S7

Toutes les tâches du plan, avec leur membre et leurs points. ★ = demande du superviseur.

## S1 — Fondations et contrats (2–8 nov)

Mettre en place le dépôt et la scène 3D, et se mettre d'accord sur les formats communs pour que chacun puisse ensuite travailler seul.

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 1 | Ramy | Dessiner la maquette de l'interface : où vont les boutons, l'inspecteur et les explications. | 2 | Terminé |
| 2 | Ramy | Créer la page index.html et la feuille de style, avec des zones vides réservées aux autres (#controls, #inspector, #explanations, #xr-slot, #install-slot). | 2 | Terminé |
| 3 | Ramy | Créer ui/index.js, qui démarre tous les modules de l'interface. | 1 | Terminé |
| 4 | Ramy | Dessiner le diagramme de cas d'utilisation. | 2 | Terminé |
| 5 | Aziz | Créer la scène 3D : caméra, lumière, rotation et zoom à la souris et au doigt. | 3 | Terminé |
| 6 | Aziz | Télécharger Three.js (version choisie avec Ayoub) et le placer dans le dépôt pour qu'il marche hors ligne. | 1 | Terminé |
| 7 | Aziz | Afficher une topologie lue depuis un fichier JSON avec des formes simples (cubes, sphères). | 2 | Terminé |
| 8 | Aziz | Écrire l'API de rendu (fonctions que les autres appelleront) et une fausse version (mock) pour tester sans attendre. | 1 | Terminé |
| 9 | Khalil | Définir le format des fichiers de scénario JSON : équipements, adresses MAC/IP, liens, étapes et explications. | 2 | Terminé |
| 10 | Khalil | Définir le format d'un évènement réseau (events.js) et les fonctions que chaque protocole doit fournir. | 2 | Terminé |
| 11 | Khalil | Définir les commandes (lecture, pause, pas à pas, vitesse, réinitialisation) et fournir un faux moteur (mock). | 1 | Terminé |
| 12 | Khalil | Créer le squelette du moteur et les premiers tests automatiques. | 2 | Terminé |
| 13 | Ayoub | Créer le dépôt GitHub, le fichier CODEOWNERS (qui possède quoi) et protéger la branche main. | 2 | Terminé |
| 14 | Ayoub | Activer GitHub Pages en HTTPS et la CI qui lance les tests et déploie automatiquement. | 2 | Terminé |
| 15 | Ayoub | Créer main.js, manifest.json et un premier sw.js minimal. | 1 | Terminé |
| 16 | Ayoub | Tester WebXR dans l'émulateur pour choisir le moteur de rendu (WebGPU ou WebGL 2). | 3 | Terminé |

Points : Ramy 7 · Aziz 7 · Khalil 7 · Ayoub 8

## S2 — Scène 3D et moteur d'évènements (9–15 nov)

Avoir de vrais équipements en 3D et un moteur qui fait avancer la simulation.

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 17 | Ramy | Créer les boutons Lecture, Pause, Pas à pas, Vitesse et Réinitialiser, reliés aux commandes du moteur. | 3 | À faire |
| 18 | Ramy | Permettre de sélectionner un objet 3D au clic ou au toucher (fonction pick). | 3 | À faire |
| 19 | Ramy | Afficher un panneau d'infos (nom, IP, MAC) quand on sélectionne un équipement. | 2 | À faire |
| 20 | Aziz | Préparer des modèles 3D légers (routeur, switch, PC) au format GLB. | 3 | À faire |
| 21 | Aziz | Créer factory.js, qui place le bon modèle pour chaque équipement du fichier JSON. | 2 | À faire |
| 22 | Aziz | Dessiner les câbles entre les équipements et les étiquettes (noms, IP). | 3 | À faire |
| 23 | Khalil | Coder le moteur : une liste d'évènements triée par temps et une horloge simulée. | 3 | À faire |
| 24 | Khalil | Gérer les états (prêt, lecture, pause, terminé) et les commandes. | 3 | À faire |
| 25 | Khalil | Créer le bus d'évènements (Observer) qui prévient l'interface et la 3D, avec ses tests. | 2 | À faire |
| 26 | Ayoub | Animer les paquets qui avancent sur les câbles au rythme de l'horloge simulée (et non des images). | 5 | À faire |
| 27 | Ayoub | Écrire le script qui génère tout seul la liste des fichiers à mettre en cache, lancé par la CI. | 2 | À faire |

Points : Ramy 8 · Aziz 8 · Khalil 8 · Ayoub 7

## S3 — ARP, ICMP et inspection (16–22 nov)

Faire marcher le premier vrai scénario : le ping.

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 28 | Ramy | Créer l'inspecteur : un clic sur un paquet affiche ses champs (MAC, IP, TTL, type). | 3 | À faire |
| 29 | Ramy | Afficher l'explication de chaque étape du scénario. | 2 | À faire |
| 30 | Ramy | Afficher le journal des messages échangés. | 2 | À faire |
| 31 | Aziz | Coder ICMP : le ping (demande et réponse), avec ses tests. | 3 | À faire |
| 32 | Aziz | Choisir les couleurs des 9 protocoles et l'aspect d'un paquet broadcast ou unicast. | 3 | À faire |
| 33 | Aziz | Faire un premier jet du diagramme de séquence du ping. | 1 | À faire |
| 34 | Khalil | Coder ARP : trouver l'adresse MAC à partir de l'IP (demande en broadcast, réponse, mémoire cache). | 3 | À faire |
| 35 | Khalil | Coder le comportement d'un PC et d'un routeur simple qui transmet vers la passerelle. | 3 | À faire |
| 36 | Khalil | Écrire les tests d'ARP. | 1 | À faire |
| 37 | Ayoub | Coder le switch : il apprend les adresses MAC et envoie partout s'il ne connaît pas la destination. | 3 | À faire |
| 38 | Ayoub | Écrire les tests du switch. | 1 | À faire |
| 39 | Ayoub | Créer le scénario de démonstration ping.json (deux réseaux reliés par un routeur). | 2 | À faire |
| 40 | Ayoub | Dessiner le diagramme de déploiement. | 1 | À faire |

Points : Ramy 7 · Aziz 7 · Khalil 7 · Ayoub 7

## S4 — Catalogue de protocoles (23–29 nov)

Ajouter DHCP, UDP, DNS et TCP, et démarrer le mode VR.

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 41 | Ramy | Coder DHCP : un PC obtient son adresse IP automatiquement (4 messages). | 3 | À faire |
| 42 | Ramy | Créer le scénario DHCP avec ses tests et ses textes d'explication. | 2 | À faire |
| 43 | Ramy | Créer la liste qui permet de choisir le scénario à jouer. | 2 | À faire |
| 44 | Aziz | Coder UDP (envoi sans connexion). | 2 | À faire |
| 45 | Aziz | Coder DNS : trouver l'adresse IP d'un nom de domaine, en passant par UDP. | 3 | À faire |
| 46 | Aziz | Créer les scénarios UDP et DNS avec leurs tests et leurs textes d'explication. | 2 | À faire |
| 47 | Khalil | Coder TCP : ouverture de connexion en 3 temps, envoi de données, fermeture. | 5 | À faire |
| 48 | Khalil | Créer le scénario TCP avec ses tests et ses textes d'explication. | 2 | À faire |
| 49 | Ayoub | Ajouter le bouton « Entrer en VR » et gérer l'entrée et la sortie du mode VR. | 3 | À faire |
| 50 | Ayoub | Créer un panneau de contrôle en 3D visible dans la VR (le HTML y disparaît). | 4 | À faire |

Points : Ramy 7 · Aziz 7 · Khalil 7 · Ayoub 7

## S5 — VR, PWA et extensions (30 nov–6 déc)

Terminer la VR et l'installation de l'application, ajouter HTTP et le routage statique. Ajout demandé par le superviseur : le débit (vitesse des liens, files d'attente, pertes, transferts TCP).

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 51 | Ramy | Coder HTTP : une page web demandée après DNS et la connexion TCP. | 3 | À faire |
| 52 | Ramy | Créer le scénario HTTP avec ses tests et ses textes d'explication. | 1 | À faire |
| 53 | Ramy | Gérer le bouton « Installer l'application » et le message si l'installation est refusée. | 2 | À faire |
| 54 | Aziz | Rendre l'appli fluide sur mobile (réutiliser formes et matériaux, limiter les paquets affichés). | 3 | À faire |
| 55 | Aziz | Rendre la scène lisible en VR (taille de la scène, taille des étiquettes). | 3 | À faire |
| 56 | Khalil | Coder le routage statique : tables de routage, TTL qui diminue, réseau à 2 routeurs. | 4 | À faire |
| 57 | Khalil | Créer le scénario de routage avec ses tests et ses textes d'explication. | 2 | À faire |
| 58 | Ayoub | Sélectionner les objets avec les manettes VR (en utilisant la fonction pick de Ramy). | 3 | À faire |
| 59 | Ayoub | Garder le mode normal si la VR n'est pas disponible. | 1 | À faire |
| 60 | Ayoub | Préparer les icônes de l'application et vérifier le manifest et le HTTPS. | 2 | À faire |
| 80 | Khalil | ★ Demande du superviseur — débit : catalogue fictif d'équipements et de câbles (vitesse négociée de chaque lien), taille et temps d'émission des trames, files d'attente des ports, pertes, mesure du trafic ; vitesse ×0,25 ; nouveaux champs des scénarios (model, cable, length, speed, size, window, lose, group). | 4 | À faire |
| 81 | Khalil | ★ Demande du superviseur — TCP : transferts découpés à fenêtre glissante, ACK cumulatifs et dupliqués, retransmission rapide et délai RTO ; scénario « Débit », tests et documentation. | 3 | À faire |
| 82 | Aziz | ★ Demande du superviseur — couleurs des câbles selon leur charge (vert, orange, rouge) et étiquette de vitesse des liens bridés. | 3 | À faire |
| 83 | Ramy | ★ Demande du superviseur — vitesse ×0,25 dans les commandes ; cas d'utilisation « comparer des débits ». | 1 | À faire |
| 84 | Ayoub | ★ Demande du superviseur — trames perdues animées (arrêt à mi-câble, rouge, disparition) ; vitesse ×0,25 dans le panneau VR. | 1 | À faire |

Points : Ramy 7 · Aziz 9 · Khalil 13 · Ayoub 7

## S6 — Stabilisation et hors ligne (7–13 déc)

Tester, corriger, faire marcher l'appli sans internet et écrire la documentation. Ajouts demandés par le superviseur : diagnostic du réseau, fiche technique, scénarios ARP et traceroute.

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 61 | Ramy | Écrire le manuel utilisateur (navigation, ping, inspection, installation, VR, dépannage). | 4 | À faire |
| 62 | Ramy | Assembler le cahier conceptuel (diagrammes de chacun) et écrire le README. | 2 | À faire |
| 63 | Aziz | Tester sur PC et sur deux smartphones, corriger les problèmes d'affichage. | 3 | À faire |
| 64 | Aziz | Finaliser le diagramme de séquence du ping. | 1 | À faire |
| 65 | Aziz | Documenter le rendu 3D et ses protocoles (ICMP, UDP, DNS). | 2 | À faire |
| 66 | Khalil | Finaliser le diagramme de classes. | 2 | À faire |
| 67 | Khalil | Écrire des tests qui vérifient que rien n'a cassé dans le moteur. | 2 | À faire |
| 68 | Khalil | Documenter la simulation et ses protocoles (ARP, TCP, routage). | 2 | À faire |
| 69 | Ayoub | Mettre en cache tous les fichiers et tester l'appli sans internet sur GitHub Pages. | 3 | À faire |
| 70 | Ayoub | Lancer un audit Lighthouse (qualité PWA) et noter les résultats. | 1 | À faire |
| 71 | Ayoub | Documenter le lancement en local et le déploiement. | 2 | À faire |
| 85 | Khalil | ★ Demande du superviseur — moteur de diagnostic (adressage, passerelles, routes, câblage, services, performances) avec corrections automatiques ; scénario « Diagnostic », tests et documentation. | 4 | À faire |
| 86 | Khalil | ★ Demande du superviseur — scénario ARP détaillé : diffusion, cache, absence de réponse, passerelle. | 1 | À faire |
| 87 | Aziz | ★ Demande du superviseur — scénario traceroute : TTL de 1 à 4 à travers trois routeurs. | 1 | À faire |
| 88 | Ramy | ★ Demande du superviseur — onglets de la colonne de droite, onglet Diagnostic (Montrer, Corriger, Tout corriger), fiche technique et ports en direct dans le panneau d'infos. | 4 | À faire |
| 94 | Khalil | ★ Demande du superviseur — laboratoire : moteur réseau des équipements administrables. VLAN 802.1Q (accès, trunk, VLAN natif) et sous-interfaces de routeur (router-on-a-stick), interfaces éteintes (shutdown / err-disabled), listes d'accès (ACL) avec compteurs, NAT statique et PAT, nouveau type d'équipement « pare-feu » à états (zones inside / dmz / outside, sessions). Scénario Pare-feu et NAT, tests. | 5 | À faire |
| 95 | Ayoub | ★ Demande du superviseur — laboratoire : switch administrable. Ports d'accès et trunk étiquetés 802.1Q, table MAC par VLAN, sécurité de port (maximum, sticky, violation shutdown / restrict / protect). Scénarios VLAN et Sécurité de port, ajoutés au catalogue. | 3 | À faire |
| 96 | Aziz | ★ Demande du superviseur — laboratoire : modèle 3D du pare-feu (ports colorés par zone), forme simple de repli, câbles coupés (shutdown, err-disabled) en rouge foncé. | 2 | À faire |

Points : Ramy 10 · Aziz 9 · Khalil 16 · Ayoub 9

## S7 — Livraison (14–20 déc)

Produire la vidéo, finir la documentation et préparer la soutenance. Seuls ajouts : ceux demandés par le superviseur (éditeur de topologie, VR en WebGPU, vérification HTTPS).

| N° | Membre | Tâche | Points | Statut |
| --- | --- | --- | --- | --- |
| 72 | Ramy | Écrire le script de la vidéo et enregistrer la voix off. | 3 | À faire |
| 73 | Ramy | Documenter DHCP et HTTP. | 1 | À faire |
| 74 | Aziz | Filmer la démo sur PC, mobile et VR émulée. | 2 | À faire |
| 75 | Aziz | Monter la vidéo (5 minutes maximum). | 2 | À faire |
| 76 | Khalil | Écrire la documentation d'architecture générale. | 3 | À faire |
| 77 | Khalil | Optionnel : ajouter IPv6 simplifié (F09), seulement si aucun bug n'est ouvert. | 1 | À faire |
| 78 | Ayoub | Publier la version finale v1.0 (18 déc). | 1 | À faire |
| 79 | Ayoub | Préparer le poste de soutenance (émulateur testé) et un plan B (vidéo locale si pas de réseau). | 3 | À faire |
| 89 | Khalil | ★ Demande du superviseur — fonctions de construction d'une topologie pour l'éditeur (ajout, câblage, réglages, adressage automatique, import/export, historique) et leurs tests. | 4 | À faire |
| 90 | Ramy | ★ Demande du superviseur — onglet Construire (éditeur de topologie, sauvegardes, import/export, annuler), réseau personnalisé dans le choix de scénario ; documentation, captures et README. | 5 | À faire |
| 91 | Aziz | ★ Demande du superviseur — glisser-déposer des équipements, recadrage automatique, boucle d'image partagée avec la VR ; WebGPU gardé même quand la VR est possible. | 3 | À faire |
| 92 | Ayoub | ★ Demande du superviseur — VR en WebGPU (voie native, pont pour émulateur, repli WebGL 2), manettes du pont, second panneau VR (Étape, Fiche, Diagnostic), tolérance de visée ; garde-fou contre les boucles entre switchs. | 4 | À faire |
| 93 | Ayoub | ★ Demande du superviseur — vérification HTTPS / TLS du site publié, après chaque déploiement et chaque lundi en CI ; fichier ATTRIBUTION. | 2 | À faire |
| 97 | Khalil | ★ Demande du superviseur — laboratoire : consoles des équipements. Interpréteur de commandes en trois styles selon le modèle (IOS, VRP, invite de commandes du PC) : modes, abréviations, aide « ? », complétion, show / display, configuration qui modifie vraiment le réseau, ping et traceroute joués dans la scène. Missions guidées vérifiées automatiquement. | 5 | À faire |
| 98 | Ramy | ★ Demande du superviseur — laboratoire : fenêtre de console (onglets par équipement, historique, Tab, ?), bouton Console dans le panneau Équipement, catalogue de l'éditeur avec la fiche de chaque modèle (description, ports, système), onglet Missions (objectifs, indices, « Pourquoi ? »). Manuel du laboratoire. | 5 | À faire |
| 99 | Aziz | ★ Demande du superviseur — laboratoire en 3D : salle (sol, murs, plafond lumineux, porte, tableau blanc), paillasses et baies sous les équipements, étagère-catalogue avec tous les modèles ; vue à la première personne (ZQSD/WASD, souris, viseur, E pour la console) et vue de survol ; écran tactile (joystick). | 5 | À faire |
| 100 | Ayoub | ★ Demande du superviseur — laboratoire en VR : salle à l'échelle réelle, téléportation au sol, rotation par crans, console en VR avec clavier 3D et raccourcis de commandes, ajout d'équipements depuis l'étagère et câblage à la manette. Vérifié dans l'émulateur avec WebGPU (aucun contexte WebGL). | 5 | À faire |

Points : Ramy 14 · Aziz 12 · Khalil 13 · Ayoub 15
