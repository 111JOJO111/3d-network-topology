# Tournage et montage de la vidéo (tâches n° 74 et n° 75)

Ces deux tâches sont hors dépôt : rien à pousser sur GitHub. Ce document est une aide pour les mener.
Le script et la voix off viennent de Ramy (`Ramy/S7/hors-depot/script-video.md`) : les séquences ci-dessous portent les mêmes numéros.

## Premier montage fourni : `video-demo-premier-montage.mp4`

Une première version de la vidéo est dans ce dossier (2 min 56, 1280 × 720, sans son). Elle a été tournée
automatiquement en pilotant la vraie application, et suit le script de Ramy : titre, exploration, ping lancé à la main,
pause / pas à pas / inspecteur, DHCP, HTTP, vitesse et langue, VR émulée (casque Meta Quest 3 simulé), vue smartphone, fin.
Les phrases du script sont incrustées en sous-titres.

Ce qu'il reste à faire pour la version finale :

- [ ] **Voix off** : l'enregistrer (Ramy) et la poser sur la vidéo. Les sous-titres donnent le texte et le rythme.
- [ ] **Installation PWA et mode hors ligne** : ces deux moments sont remplacés par un carton de texte, car ils ne peuvent
      pas être filmés sans un vrai navigateur. Les tourner sur le site déployé (séquences 3 et 8 ci-dessous) et remplacer le carton.
- [ ] **Pastille WebGPU** : la capture a été faite sans carte graphique, la pastille en bas à droite de la scène indique donc
      « WebGL 2 ». Retourner au moins la séquence d'exploration sur un vrai poste, où elle indique « WebGPU ».
- [ ] **Smartphone** : la vue mobile est une émulation ; la remplacer par une capture sur un vrai téléphone si possible.
- [ ] **Compléments du superviseur (★)** : le premier montage date d'avant ces ajouts. Tourner les séquences 9 bis, 11, 12 et 13
      (environ 1 min 45 en tout, voir le script) et les insérer avant le carton de fin.
- [ ] Vérifier que la durée finale reste sous 5 minutes (il reste environ 2 minutes de marge, que les séquences ★ utilisent).

Vous pouvez aussi repartir de zéro avec la liste ci-dessous : le premier montage sert alors de modèle.

## Préparer la capture

- [ ] Utiliser le **site déployé** (URL HTTPS), pas localhost : l'adresse doit se voir à l'écran.
- [ ] Chrome en fenêtre 1920 × 1080, zoom 100 %, barre de favoris masquée, notifications coupées.
- [ ] Profil Chrome propre. Extension **Immersive Web Emulator** désactivée pour les séquences 1 à 8 (la pastille de la scène
      indique alors « WebGPU »), activée seulement pour la séquence 9 (la VR passe par WebGL 2).
- [ ] Désinstaller l'application avant la séquence 3, pour que le bouton « Installer » réapparaisse.
- [ ] Vider le cache du site avant la séquence 2 (Application → Storage → Clear site data).
- [ ] Logiciel de capture gratuit : OBS Studio (30 images par seconde, format MP4).
- [ ] Faire un essai de 20 secondes et le relire avant de tout tourner.

## Liste des plans

| Séq. | Support | Ce qu'il faut capturer | Fait |
| --- | --- | --- | --- |
| 1 | PC | carton de titre ; un schéma statique de cours | ☐ |
| 2 | PC | saisie de l'URL, chargement, rotation et zoom lents | ☐ |
| 3 | PC | installation acceptée, fenêtre de l'application ; puis un refus | ☐ |
| 4 | PC | sélection de PC1 puis PC3, « Lancer un ping », ARP, table MAC du switch | ☐ |
| 5 | PC | pause, pas à pas, clic sur un paquet, inspecteur | ☐ |
| 6 | PC | scénario DHCP en entier | ☐ |
| 7 | PC | scénario HTTP en vitesse ×2 | ☐ |
| 8 | PC | vitesse ×4, réinitialisation, mode Offline et rechargement | ☐ |
| 2 bis | Smartphone | navigation au doigt (capture d'écran du téléphone, ou filmé de dessus) | ☐ |
| 9 | PC + émulateur | entrée en VR, panneau 3D, gâchette sur un bouton et sur un équipement, sortie | ☐ |
| 9 bis | PC + émulateur | pastille « WebGPU » pendant la VR, message « VR WebGPU », panneau de droite : onglets Fiche puis Diagnostic → Corriger | ☐ |
| 11 ★ | PC | scénario « Débit » en ×4 : câbles qui passent au vert, orange, rouge ; clic sur SW1 : fiche technique et ports en direct ; bilan des transferts dans le journal | ☐ |
| 12 ★ | PC | scénario « Diagnostic » : les pings échouent ; onglet Diagnostic, « Montrer » puis « Tout corriger » ; on rejoue, tout passe | ☐ |
| 13 ★ | PC | onglet Construire : réseau vide, 2 PC + switch + routeur + serveur, « Relier », glisser un équipement, « Adressage automatique », « Lancer » un ping | ☐ |
| 10 | — | carton de fin : technologies, équipe, superviseur | ☐ |

Conseils : mouvements de souris lents, une pause d'une seconde avant et après chaque clic (elle facilite le montage) ;
tourner chaque séquence deux fois.

## Montage

- [ ] Logiciel gratuit : Shotcut, Kdenlive ou DaVinci Resolve.
- [ ] Poser d'abord la voix off, puis caler les images dessus.
- [ ] **Durée finale : 5 minutes au maximum** (viser 4 min 50).
- [ ] Accélérer les temps morts (chargements, longues animations) plutôt que de couper une explication.
- [ ] Ajouter un titre court à chaque séquence (« ARP », « DHCP », « Mode VR »…).
- [ ] Sous-titres à partir du script.
- [ ] Volume de la voix constant ; pas de musique qui la couvre.
- [ ] Export : MP4 (H.264), 1080p, 30 images par seconde.
- [ ] Faire relire la vidéo par un membre qui n'a pas participé au tournage.
- [ ] Garder une **copie locale** sur le poste de soutenance et sur une clé USB (plan B d'Ayoub).
