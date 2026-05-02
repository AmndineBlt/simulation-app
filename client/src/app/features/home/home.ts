import { Component } from "@angular/core";
import { SimulationCardData } from "../../shared/simulation-card/simulation-card.interface";
import { SimulationCard } from "../../shared/simulation-card/simulation-card";

@Component({
  selector: "app-home",
  imports: [SimulationCard],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  simulations: SimulationCardData[] = [
    {
      number: "01",
      title: "PREDATOR / PREY",
      description: "Lotka-Volterra ecosystem simulation with wolves, rabbits and carrots evolving in real time.",
      tags: ["WebSocket", "SOLID", "NestJS"],
      route: "/simulation/predator-prey",
      active: true,
    },
    {
      number: "02",
      title: "GAME OF LIFE",
      description: "Conway's Game of Life — cellular automaton evolving on a 2D grid with simple survival rules.",
      tags: ["WebSocket", "SOLID", "NestJS"],
      route: "/simulation/game-of-life",
      active: false,
    },
  ];
}
