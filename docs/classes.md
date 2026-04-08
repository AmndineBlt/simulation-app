# Mini cours — implements en TypeScript

Une classe qui implémente une interface doit respecter tout son contrat :

```ts
class Cat implements Animal {
	id = crypto.randomUUID(); // génère un id unique
	position = {x: 0, y: 0};
	isAlive = true;
	speed = 3;
	// ...
}
```

## Objectif :

Crée rabbit.class.ts dans classes/ qui implémente Rabbit avec des valeurs par défaut cohérentes.

## Conseils :

- id → utilise crypto.randomUUID()
- position → { x: 0, y: 0 } pour l'instant
- Donne des valeurs réalistes pour un lapin (rapide, fort taux de reproduction...)