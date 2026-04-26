# WebSocket

## C'est quoi un WebSocket concrètement ?

Imagine une conversation téléphonique :

* Tu appelles quelqu'un → connexion établie
* Vous parlez dans les deux sens en temps réel → échange de données
* L'un de vous raccroche → connexion fermée

C'est exactement un WebSocket. Contrairement à une requête HTTP classique

```
HTTP (comme un SMS) :
Angular  →  "donne-moi la grille"  →  NestJS
Angular  ←  "voilà la grille"      ←  NestJS
(connexion fermée)

WebSocket (comme un appel téléphonique) :
Angular  ←→  NestJS  (connexion permanente)
NestJS envoie la grille CHAQUE seconde sans qu'Angular demande
```

Pourquoi c'est parfait pour une simulation ?
Parce qu'on ne veut pas qu'Angular demande la grille à chaque tick — on veut que NestJS l'envoie automatiquement à chaque tick.

# `simulation.service.ts`

Pourquoi ce fichier existe ?
Rappelle-toi la séparation des responsabilités :

```
simulation.gateway.ts  →  communiquer avec Angular
simulation.service.ts  →  logique de la simulation
```

Le gateway ne doit pas contenir la logique — il doit juste envoyer et recevoir. C'est le principe S !
Donc on a besoin d'un endroit pour encapsuler le SimulationEngine — c'est le rôle du service.

## `@injectable()` — c'est quoi ?

C'est une étiquette qui dit à NestJS : "Cette classe peut être injectée automatiquement dans d'autres classes"

Concrètement, grâce à @Injectable(), tu peux écrire dans le gateway :

```
constructor(private simulationService: SimulationService) {}
```

Et NestJS crée et injecte automatiquement le service — tu n'as pas besoin de faire new SimulationService() toi-même !

# Méthode `init()` et `tick()`

Pourquoi `init()` et `tick()` dans le service ?
Tu as déjà ces méthodes dans SimulationEngine. Alors pourquoi les réécrire dans le service ?
Rappelle-toi le principe D — le gateway ne doit pas dépendre directement de SimulationEngine. Il doit dépendre d'une abstraction.

```
Sans service :
Gateway → SimulationEngine (dépendance directe)

Avec service :
Gateway → SimulationService → SimulationEngine
```

Le service fait le pont entre le gateway et le moteur.

```ts
// Le gateway appelle le service
this.simulationService.init();
const grid = this.simulationService.tick();

// Le service appelle le moteur
init()
{
	this.engine.init(10, 10); // délègue au moteur
}

tick()
:
Grid
{
	this.engine.tick();        // délègue au moteur
	return this.engine.grid;   // retourne la grille
}
```

# `simulation.gateway.ts`

## `@WebSocketGateway()` — c'est quoi ?

C'est une étiquette qui dit à NestJS : "Cette classe gère les connexions WebSocket".

Comme `@Injectable()` pour les services, c'est NestJS qui s'occupe de tout automatiquement. Tu n'as pas besoin de créer le serveur WebSocket toi-même.
`@WebSocketServer()` et `server.emit()` :

```ts
@WebSocketServer()
server
:
Server; // le serveur WebSocket

// envoie un message à TOUS les clients connectés
this.server.emit('grid', grid);
//               ^nom    ^données
//               event
```

Le flux complet :

```
NestJS démarre
→ afterInit() appelé
→ startSimulation() lance setInterval
→ chaque seconde : tick() + emit('grid')
→ Angular reçoit la grille
```

# `simulation.module.ts`

## C'est quoi un module NestJS ?

Un module c'est comme une boîte qui regroupe tout ce qui appartient à la simulation :

```ts

@Module({
	providers: [SimulationService, SimulationGateway]
})
export class SimulationModule {
}
```

`providers` dit à NestJS : "Ces classes existent dans cette boîte et peuvent être injectées".
Pourquoi `app.module.ts` importe `SimulationModule` ?

```
AppModule (boîte principale)
└── SimulationModule (sous-boîte)
    ├── SimulationService
    └── SimulationGateway
```

NestJS a besoin de connaître toutes les boîtes au démarrage.  
En important `SimulationModule` dans `AppModule`, NestJS sait qu'il doit charger `SimulationService` et `SimulationGateway`.