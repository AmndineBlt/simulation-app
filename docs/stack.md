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