# Diagramme de séquence du ping

> Premier jet (S3). Il sera finalisé en S6, quand le routage statique et le TTL seront en place.
Scénario `scenarios/ping.json`, étape 1 : **PC1 (192.168.1.10) envoie un ping à PC2 (192.168.1.11)**,
dans le même réseau, caches ARP et table MAC vides au départ.

```mermaid
sequenceDiagram
  autonumber
  participant PC1 as PC1<br/>192.168.1.10
  participant SW1 as SW1 (switch)
  participant PC2 as PC2<br/>192.168.1.11
  participant R1 as R1<br/>192.168.1.1

  Note over PC1: PC2 est dans mon réseau,<br/>mais je ne connais pas sa MAC
  PC1->>SW1: ARP Request (diffusion) « Qui a 192.168.1.11 ? »
  Note over SW1: apprend MAC de PC1 sur p1<br/>diffusion : recopie sur p2 et p3
  SW1->>PC2: ARP Request
  SW1->>R1: ARP Request
  Note over R1: ce n'est pas mon adresse : ignoré
  Note over PC2: note PC1 dans son cache ARP
  PC2->>SW1: ARP Reply (unicast) « 192.168.1.11 est à …:01:11 »
  Note over SW1: apprend MAC de PC2 sur p2<br/>destination connue : sortie par p1 seulement
  SW1->>PC1: ARP Reply
  Note over PC1: cache ARP : 192.168.1.11 → …:01:11
  PC1->>SW1: ICMP Echo Request (seq 1, TTL 64)
  SW1->>PC2: ICMP Echo Request
  PC2->>SW1: ICMP Echo Reply (seq 1)
  SW1->>PC1: ICMP Echo Reply
  Note over PC1: ping réussi
```

Ce qu'il faut retenir :

1. **ARP précède toujours le premier paquet IP** vers une adresse dont la MAC est inconnue.
2. La requête ARP est une **diffusion** (tout le réseau local la reçoit) ; la réponse est **unicast**.
3. Le switch **apprend** les adresses MAC à chaque trame reçue, puis cesse d'inonder ses ports.
