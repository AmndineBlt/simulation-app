# Mini cours — L'interface en TypeScript

Une interface définit un contrat : elle dit ce qu'une entité doit savoir faire, sans dire comment. C'est la base du principe D (Dependency Inversion) et L (Liskov).

# Les entités

## Objectif

Crée une interface Entity qui représente n'importe quelle entité d'une simulation, sans mentionner lapin ou loup.

## Conseils

- Quelles propriétés a toute entité ? (position, identifiant...)
- Quelles actions peut faire toute entité ?
- Reste minimaliste — n'ajoute que ce qui est universel

Entity

- un id, uuid
- une position (x, y), objet{number, number}
- est vivante, bool

# Animal

Animal → ce qu'il EST (énergie, vitesse, état)
Rules → ce qu'il FAIT (se déplacer, manger, se reproduire)

## Objectif

Crée une interface Animal qui étend Entity et ajoute ce qui est spécifique à tout animal (sans parler de lapin ou loup).

## Conseils

- Qu'est-ce qui différencie un animal d'une simple entité ?
- Pense à son énergie, son âge, sa capacité à se reproduire...
- Reste universel — tout animal doit avoir ces propriétés

Animal

- vitesse de déplacement, number
- energie, number

```
Est-ce que l'animal décide lui-même où il se déplace ?

Dans ton ancien code Python, c'est probablement les règles de simulation qui décidaient du déplacement (case vide, direction aléatoire...).
Si move() est dans l'interface Animal, ça veut dire que chaque animal contient sa propre logique de déplacement.
Concernant reproduce(), même question — c'est la simulation qui décide quand et si un animal se reproduit, ou l'animal lui-même ?
```

# Lapin & Loup

## Objectif

Crée Rabbit et Wolf qui étendent Animal en ajoutant ce qui leur est uniquement spécifique.

## Conseils

- Le loup mange d'autres entités — comment modéliser ça ?
- Le lapin a un taux de reproduction plus élevé — est-ce une propriété ou une méthode ?
- Si tu ne trouves rien de spécifique à l'un d'eux, c'est peut-être qu'Animal suffit.

# Enum

Un enum, c'est simplement une liste de valeurs nommées. Au lieu d'écrire des strings à la main partout (risque de faute de frappe), tu définis les valeurs une seule fois :

```ts
// Sans enum — risqué ❌
diet: 'herbivore' // et si quelqu'un écrit 'Herbivore' ?

// Avec enum — sécurisé ✅
enum Diet {
	Herbivore = 'herbivore',
	Carnivore = 'carnivore',
}

// Utilisation
diet: Diet.Herbivore
diet: Diet.Carnivore
```

C'est comme une liste de constantes groupées sous un même nom.

