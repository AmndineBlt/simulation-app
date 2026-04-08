| Angular       | NestJS                   |
|---------------|--------------------------|
| ├── display/  | ├── entities/            |
| ├── controls/ | ├── rules/               |
| └── charts/   | ├── simulation/          |
|               | └── gateway/ (WebSocket) |

| Besoin                   | Librairie TS                 |
|--------------------------|------------------------------|
| Graphiques (populations) | Chart.js ou D3.js            |
| Grille animée            | Canvas API (natif) ou PixiJS |
| Dashboard complet        | Angular                      |

```
Angular (front)     →    NestJS (back)
- affichage              - moteur de simulation
- graphiques             - règles / entités
- contrôles UI           - API WebSocket (temps réel)
                         - sauvegarde BDD
```

```
Engine                    Rules
------                    -----
- créer la grille         - comment se déplacer
- placer les animaux      - comment se reproduire
- avancer d'un tick   →   - comment chasser
- appliquer les règles    - qui mange qui
```