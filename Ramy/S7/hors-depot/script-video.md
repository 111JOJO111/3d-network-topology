# Script de la vidéo de démonstration (tâche n° 72)

> ★ : séquences ajoutées pour les compléments demandés par le superviseur (S5 à S7). Raccourcir légèrement les
> séquences 2, 7 et 8 pour rester sous 5 minutes.

Contrainte du cahier des charges : **5 minutes maximum**, voix off, et il faut montrer l'accès web, l'installation
PWA, plusieurs protocoles, l'inspection, les commandes et la VR émulée.

Ce document est une **proposition de départ** : à réécrire avec vos mots avant d'enregistrer. Le texte de la voix
off fait environ 600 mots, soit 4 min 30 à un débit posé ; gardez 20 à 30 secondes de marge.

| # | Durée | À l'écran (tourné par Aziz) | Voix off |
| --- | --- | --- | --- |
| 1 | 0:00 – 0:20 | Titre « 3D Network Topology », puis un schéma réseau statique tiré d'un cours | « Comprendre ARP, DNS ou TCP sur un schéma figé, c'est difficile : on ne voit ni le trajet des paquets, ni l'ordre des messages. 3D Network Topology les montre en mouvement, dans une topologie en trois dimensions. » |
| 2 | 0:20 – 0:45 | Chrome : on tape l'URL GitHub Pages, la scène apparaît ; on tourne, on zoome | « L'application s'ouvre par un simple lien, en HTTPS, sans rien installer. Voici deux réseaux locaux reliés par un routeur. On tourne autour, on zoome, à la souris comme au doigt. » |
| 3 | 0:45 – 1:05 | Clic sur « Installer l'application », la fenêtre de l'application installée ; puis refus sur un autre essai | « Sur un navigateur compatible, on peut l'installer comme une application. C'est facultatif : si l'on refuse, tout continue de fonctionner dans le navigateur. » |
| 4 | 1:05 – 1:50 | Clic sur PC1 puis PC3, « Lancer un ping » ; ARP en diffusion, table MAC du switch ; pause | « Sélectionnons deux machines et lançons un ping. PC1 ne connaît pas encore l'adresse MAC de sa passerelle : il diffuse une requête ARP à tout le réseau — c'est la sphère entourée d'un anneau. Le switch apprend au passage quelle adresse se trouve derrière quel port. Seul le routeur répond, directement à PC1. » |
| 5 | 1:50 – 2:25 | Pas à pas ; clic sur le paquet ICMP ; inspecteur : MAC, IP, TTL | « Mettons en pause et avançons pas à pas. Un clic sur le paquet ouvre l'inspecteur : adresses MAC, adresses IP, TTL. Après le routeur, les adresses MAC ont changé, les adresses IP non, et le TTL a perdu une unité. » |
| 6 | 2:25 – 3:05 | Scénario DHCP : les quatre messages, l'étiquette de PC1 qui reçoit son adresse | « Passons à DHCP. Ce PC démarre sans adresse. Quatre messages suffisent : Discover, Offer, Request, Ack. Son étiquette affiche maintenant l'adresse qu'il vient de recevoir. » |
| 7 | 3:05 – 3:40 | Scénario HTTP en vitesse ×2 : DNS, TCP, GET, 200 OK ; journal qui défile | « Dernier exemple : charger une page web. Le nom est d'abord traduit par DNS, puis TCP ouvre une connexion en trois temps, et enfin HTTP demande la page. À chaque message, l'explication s'affiche à droite, et le journal garde l'historique. » |
| 8 | 3:40 – 3:55 | Vitesse ×4, Réinitialiser ; puis mode hors ligne dans les outils de développement, rechargement | « On peut accélérer, ralentir, tout réinitialiser. Et après une première visite, l'application se recharge sans connexion. » |
| 9 | 3:55 – 4:30 | « Entrer en VR » avec Immersive Web Emulator ; panneau 3D ; gâchette sur un bouton puis sur un équipement ; sortie | « Enfin, le mode réalité virtuelle. Nous n'avons pas de casque : nous utilisons l'émulateur de Chrome. Le réseau devient une maquette posée devant soi, un panneau reprend les commandes, et la manette sélectionne un équipement. Sans casque ni émulateur, l'application reste en mode classique. » |
| 9 bis ★ | — | Dans la VR : message « VR WebGPU », panneau de droite, onglet Diagnostic | « Et tout cela en WebGPU, y compris en réalité virtuelle : à droite, un second panneau donne la fiche de l'équipement visé et le diagnostic du réseau. » |
| 11 ★ | 0:30 | Scénario « Débit » en ×4 ; câbles colorés ; fiche technique de SW1 | « Tous les liens ne se valent pas. Une vieille carte à 100 mégabits, un câble Cat 5 : le lien prend la vitesse du plus lent. Quand trois postes envoient en même temps, le lien du serveur passe à l'orange puis au rouge, et les trames font la queue. » |
| 12 ★ | 0:30 | Scénario « Diagnostic » : pings en échec, onglet Diagnostic, « Tout corriger », pings réussis | « Ce réseau-ci est mal configuré. Le diagnostic trouve une adresse en double, une passerelle hors réseau, une route manquante, et explique chaque fois pourquoi. Un clic corrige tout ; on rejoue : les pings passent. » |
| 13 ★ | 0:45 | Onglet Construire : ajout, « Relier », glisser, « Adressage automatique », « Lancer » | « Enfin, chacun peut construire son propre réseau : on ajoute des équipements, on les relie, l'adressage automatique règle les adresses et les routes, et l'on lance un ping. Le réseau s'enregistre et s'exporte. » |
| 10 | 4:30 – 4:50 | Récapitulatif : logos Three.js, WebXR, PWA, GitHub Pages ; noms de l'équipe et du superviseur | « Three.js, WebXR, une PWA hébergée gratuitement sur GitHub Pages : aucun budget, aucun casque. Merci de votre attention. » |

Un premier montage muet, sous-titré avec une version courte de ce texte, existe déjà : `Aziz/S7/hors-depot/video-demo-premier-montage.mp4`
(2 min 56). Regarde-le avant d'enregistrer : il donne le rythme de chaque séquence.

## Avant d'enregistrer la voix

- [ ] Relire le texte à voix haute et chronométrer : viser 4 min 30.
- [ ] Vérifier chaque affirmation dans l'application déployée (adresses, noms des boutons).
- [ ] Enregistrer dans une pièce calme, micro à 15 cm, sans écho ; une prise par séquence.
- [ ] Nommer les fichiers `voix-01.wav`, `voix-02.wav`… dans l'ordre du tableau, et les transmettre à Aziz.
- [ ] Prévoir les sous-titres : le texte ci-dessus sert de base.
