# Le laboratoire de Steve

> Demande du superviseur (S6–S7). Persona : **Steve**, étudiant en réseaux, entre dans un laboratoire où des
> switchs, des routeurs, des pare-feu, des serveurs et des PC sont posés sur des paillasses. Il peut jouer les
> montages tout prêts, en construire de nouveaux et configurer chaque équipement avec ses propres commandes, à
> l'écran ou dans un casque de réalité virtuelle.

## 1. Le parcours de Steve

1. Il ouvre l'application et appuie sur **Laboratoire** (en haut à droite) — ou sur **Entrer en VR** : en VR, il est
   directement dans la salle, à l'échelle réelle.
2. Il arrive par la porte. Sur le tableau blanc du fond : le titre et la consigne du montage en cours.
3. Il s'approche d'un équipement : le viseur affiche sa **fiche** (nom, modèle, système, adresses).
4. Il appuie sur **E** : la **console** de l'équipement s'ouvre (fenêtre en bas à gauche ; en VR, un pupitre avec un
   clavier 3D). Il tape ses commandes ; le réseau change vraiment.
5. Il lance un `ping` : les paquets partent dans la salle, le résultat s'affiche dans la console.
6. Il veut un autre montage : il prend un modèle sur l'**étagère « Catalogue »** (un clic dessus le pose devant lui),
   le câble avec l'outil **Relier** de l'onglet Construire (ou le bouton **Câbler** en VR) et le configure.
7. Pour s'entraîner, l'onglet **Missions** propose six exercices guidés, de la prise en main au réseau construit de
   zéro.

## 2. Les commandes de déplacement

| Écran | Touches / gestes |
| --- | --- |
| Ordinateur | **ZQSD** ou **WASD** ou flèches : marcher · **Maj** : plus vite · **souris** : regarder (cliquer d'abord dans la scène) · **clic** : choisir l'objet visé · **E** : console · **V** : survol / marche · **B** : onglet Construire · **L** : quitter le labo · **Échap** : libérer la souris |
| Écran tactile | **joystick** en bas à gauche : marcher · **glisser** : regarder · **toucher** un objet : le choisir · boutons **Console** et **Choisir** |
| Casque VR | **gâchette** sur le sol : se téléporter (un anneau montre l'arrivée) · gâchette sur un équipement : sa console · gâchette sur l'étagère : poser le modèle · **joystick gauche/droite** : tourner de 30° |

La vue **Survol** (V, ou bouton en haut à droite de la scène) montre toute la salle d'en haut, avec la navigation
habituelle à la souris : les murs disparaissent d'eux-mêmes quand on les regarde de l'extérieur.

## 3. Les équipements et leurs modèles

Chaque modèle a sa propre fiche (description, ports, débit, système). Elle s'affiche dans le catalogue de l'onglet
**Construire**, sur l'étagère du labo et dans le viseur.

| Type | Modèles | Système et style de commandes |
| --- | --- | --- |
| PC | NX-1 (Gigabit), NX-0 (100 Mb/s) | invite de commandes (`ipconfig`, `ping`, `tracert`, `netsh`…) |
| Serveur | SV-2, SV-4X (10 Gb/s) | invite de commandes |
| Switch | CX-8G, CX-8F, CX-24G (non administrables, **sans console**) ; **CX-24M** (administrable) ; **VS-24** (administrable) | CX-24M : NetCore OS, style **IOS** ; VS-24 : Versa NOS, style **VRP** |
| Routeur | RX-2G, RX-4G | NetCore OS, style **IOS** |
| Routeur | **VR-2** | Versa NOS, style **VRP** |
| Pare-feu | **SG-3** (3 zones), **SG-8X** (8 interfaces) | Shield OS, style **IOS** (avec `nameif`, `security-level`, `show conn`) |

Les noms de modèles et de systèmes sont inventés : les commandes ressemblent à celles des vrais constructeurs pour
que ce qui est appris au labo serve ensuite, sans reproduire un produit précis. Référence complète : `console.md`.

## 4. Ce que le réseau sait faire (moteur)

- **VLAN 802.1Q** : ports d'accès et trunk (VLANs autorisés, VLAN natif), table MAC par VLAN.
- **Router-on-a-stick** : sous-interfaces `g0/0.10` avec `encapsulation dot1q 10`.
- **Sécurité de port** : nombre maximal d'adresses, apprentissage « sticky », violation `shutdown`
  (le port passe en *err-disabled* et le câble devient rouge foncé), `restrict` ou `protect`.
- **Listes d'accès (ACL)** étendues, nommées ou numérotées, en entrée ou en sortie, avec compteurs de correspondances.
- **NAT** statique et dynamique avec surcharge (PAT), table des traductions.
- **Pare-feu à états** : zones `inside` (100), `dmz` (50), `outside` (0) ; ce qui part d'une zone plus sûre peut
  revenir (session), le reste est refusé sauf ACL explicite.
- **Interfaces éteintes** (`shutdown`) : plus rien ne passe, le câble devient rouge foncé.

Chaque décision est expliquée dans le panneau « Ce qui se passe » (par exemple : « la réponse appartient à une
session déjà autorisée »).

## 5. Les missions

| Mission | Niveau | Situation de départ | Ce qui est vérifié |
| --- | --- | --- | --- |
| Prise en main | 1 | scénario Routage | `enable` et `show ip route` tapés sur R1, ping PC1 → PC2 réussi |
| Route de retour disparue | 2 | R2 a perdu sa route | la route sur R2, puis un ping réussi |
| VLAN erroné | 2 | le port de PC3 est dans le VLAN 10 | port dans le VLAN 20, ping de PC3 vers sa passerelle |
| Verrouiller la prise | 3 | pas de sécurité sur Gi0/1 | maximum 1, sticky, violation shutdown |
| Publier le site web | 3 | l'ACL côté Internet est vide | HTTP vers le serveur autorisé, ping toujours refusé |
| Votre réseau, de zéro | 4 | labo vide | 2 PC + 1 routeur, tout câblé, deux réseaux, diagnostic sans erreur, ping réussi |

Les objectifs se cochent seuls, quelle que soit la façon d'y arriver (console IOS ou VRP, éditeur, bouton
Corriger du diagnostic). Trois indices de plus en plus précis sont disponibles ; « Pourquoi ? » explique la notion
une fois la mission réussie. Les missions réussies restent cochées dans le navigateur.

## 6. Où est le code

| Partie | Fichier | Membre |
| --- | --- | --- |
| VLAN, ACL, NAT, pare-feu | `src/sim/security.js`, `src/sim/devices/firewall.js`, `router.js`, `network.js` | Khalil (S6) |
| Switch administrable | `src/sim/devices/switch.js` | Ayoub (S6) |
| Pare-feu en 3D, câbles coupés | `tools/make-models.mjs`, `src/render/shapes.js`, `src/render/linkLoad.js` | Aziz (S6) |
| Consoles et missions (logique) | `src/sim/cli.js`, `src/sim/config.js`, `src/sim/missions.js` | Khalil (S7) |
| Fenêtre de console, onglet Missions, catalogue | `src/ui/terminal.js`, `src/ui/missions.js`, `src/ui/editorPanel.js` | Ramy (S7) |
| Salle 3D, première personne, étagère | `src/render/lab.js`, `src/ui/labHud.js` | Aziz (S7) |
| Laboratoire en VR, clavier 3D | `src/xr/vrConsole.js`, `src/xr/controllers.js`, `src/xr/session.js` | Ayoub (S7) |

Tests : `tests/lab.test.js`, `tests/cli.test.js`, `tests/missions.test.js`, et les références
`tests/golden/vlan.txt`, `pare-feu.txt`, `securite-port.txt`.

## 7. Choix de conception

- **La console modifie le scénario, pas l'équipement vivant.** Chaque commande de configuration produit un nouveau
  scénario (validé) que la simulation recharge : la console, l'éditeur, le diagnostic et les missions travaillent
  donc tous sur la même description, et `show running-config` est toujours vrai.
- **Une session de console par équipement**, partagée entre la fenêtre et le pupitre VR : on peut commencer à taper
  à l'écran et finir dans le casque.
- **En VR, c'est la salle qui bouge.** Pour se téléporter, on déplace la salle autour de l'utilisateur au lieu de
  déplacer l'utilisateur : la même méthode marche pour les trois voies VR (WebGPU directe, pont WebGPU, WebGL 2), et
  les panneaux restent à portée de main.
- **Le pupitre VR n'apparaît que lorsqu'une console est ouverte** : sinon il masquerait les paillasses que l'on vise.
- **Des raccourcis de commandes** sur le pupitre : taper au clavier 3D est lent, les commandes courantes du système
  de l'équipement sont proposées en un geste.
