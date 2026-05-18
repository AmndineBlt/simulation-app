import { Injectable } from "@angular/core";
import { SimulationCardData } from "../shared/simulation-card/simulation-card.interface";

@Injectable({
  providedIn: "root",
})
export class SimulationService {
  readonly simulations: SimulationCardData[] = [
    {
      number: "01",
      title: "JEU DE LA VIE",
      description:
        "Conway's Game of Life — automate cellulaire évoluant sur une grille 2D avec des règles de survie simples.",
      tags: ["WebSocket", "SOLID", "NestJS"],
      route: "/simulation/game-of-life",
      active: false,
    },
    {
      number: "02",
      title: "PRÉDATEUR / PROIE",
      description:
        "Simulation de l'écosystème Lotka-Volterra avec des loups, des lapins et des carottes évoluant en temps réel.",
      tags: ["WebSocket", "SOLID", "NestJS"],
      route: "/simulation/predator-prey",
      active: true,
    },
  ];
}
