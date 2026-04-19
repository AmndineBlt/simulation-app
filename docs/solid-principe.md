| Lettre | Principe              | En une phrase                                            |
|--------|-----------------------|----------------------------------------------------------|
| S      | Single Responsibility | Une classe = une seule raison de changer                 |
| O      | Open/Closed           | Ouvert à l'extension, fermé à la modification            |
| L      | Liskov Substitution   | Une sous-classe doit pouvoir remplacer sa classe parente |
| I      | Interface Segregation | Pas de méthodes inutiles imposées                        |
| D      | Dependency Inversion  | Dépendre des abstractions, pas des implémentations       |

Quelles sont les grandes responsabilités du système ?

1. l'affichage de la simulation
2. la définition des entités
3. les règles de la simulation
4. le déroulement de la simulation

Les différents composant

- Entites -> gére toutes les entites présentes dans la simulation. C'est là qu'on définit les classes, les types, les interfaces des entites.
- Rules -> définit les différentes regles de la simulation
	- Une règle c'est une classe qui prend la grille avant et retourne la grille aprés C'est de la logique pure — pas d'affichage, juste des calculs sur des données.
- Engine -> c'est le moteur de la simulation, c'est ici qu'on applique les régles.
- Gateway -> C'est le pont entre NestJS et Angular. Comme NestJS tourne sur un serveur et Angular dans le navigateur, ils ont besoin de communiquer.
  ```
  NestJS (serveur)          Angular (navigateur)
     Engine          →        Affichage
  calcule le tick   gateway   reçoit la grille
                   WebSocket  et dessine
  ```
  À chaque tick, le gateway envoie la grille mise à jour à Angular en temps réel.