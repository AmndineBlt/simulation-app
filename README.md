Hub de Simulations est une application web personnelle regroupant différentes simulations interactives. Elle me sert de terrain d'expérimentation pour apprendre Angular et NestJS tout en appliquant
des principes de qualité logicielle comme SOLID, le clean code et la clean architecture.

La première simulation implémentée est le Jeu de la Vie de Conway (1970), un automate cellulaire mathématique évoluant sans intervention humaine sur une grille bidimensionnelle, selon des règles
simples de survie et de reproduction des cellules.

La deuxième simulation est une modélisation proie-prédateur de type Lotka-Volterra, reproduisant l'évolution couplée de deux espèces (loups et lapins) avec des carottes comme ressource alimentaire.
Elle illustre les cycles naturels de population avec des règles de déplacement, alimentation, reproduction et mort. La simulation tourne côté serveur (NestJS) et envoie chaque état de la grille en
temps réel au client Angular via WebSocket.