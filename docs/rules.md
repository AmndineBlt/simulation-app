| Règle          | Description                         |
|----------------|-------------------------------------|
| move()         | Tout animal se déplace              |
| reproduce()    | Tout animal se reproduit            |
| eat()          | Tout animal mange                   |
| updateEnergy() | Tout animal gagne/perd de l'énergie |

Le moteur ne sait pas ce que font les règles, il les applique juste une par une

```ts
rules.forEach(rule => {
	grid = rule.apply(grid);
});
```

# Mouvement

C'est ta première vraie règle de simulation ! 😊
Mini cours — implements sur une classe de règle

```ts
export class MovementRule implements Rule {
	apply(grid: Grid): Grid {
		// logique de déplacement
		return grid;
	}
}
```

## Objectif

Crée simulation/rules/movement.rule.ts qui implémente Rule.
Avant de coder la logique, réfléchis aux étapes du déplacement :

- On parcourt toutes les cases de la grille
- Pour chaque case, si elle contient un Animal...
- On cherche une case vide autour de lui
- On le déplace

```
rules/        → logique pure, pas d'affichage
display/      → affichage (Angular, plus tard)
```

`MovementRule` fait une seule chose :

À chaque tick, elle parcourt la grille, trouve les animaux, et met à jour leur position vers une case vide adjacente.

```
Avant MovementRule        Après MovementRule
[ ][ ][ ][ ]             [ ][ ][ ][ ]
[ ][🐰][ ][ ]    →       [ ][ ][🐰][ ]
[ ][ ][ ][ ]             [ ][ ][ ][ ]
```

La grille en mémoire change, c'est tout. Angular affichera ça plus tard.

Le flux complet sera :

```
Tick 1
  → MovementRule.apply(grid)
  → EatingRule.apply(grid)
  → ReproductionRule.apply(grid)
  → Angular reçoit la grille mise à jour et affiche
```

```
MovementRule        → déplacement uniquement
EatingRule          → manger uniquement
ReproductionRule    → reproduction uniquement
EnergyRule          → gain/perte d'énergie uniquement
```

Chacune implémente Rule et a sa propre méthode apply(). Le moteur les applique toutes à chaque tick.

# Visualisation

Grille 3x3
La grille a `grid.length` lignes et `grid[0].length` colonnes

```
[ ][🐰][ ]            [🐰][ ][ ]
[ ][ ][ ]    →         [ ][ ][ ]
[ ][ ][ ]              [ ][ ][ ]
```