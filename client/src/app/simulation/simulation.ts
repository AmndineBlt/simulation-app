import { Component, OnInit, signal } from "@angular/core";
import { io } from "socket.io-client";
import { NgClass } from "@angular/common";
import { PopulationChart } from "../population-chart/population-chart";

interface GridCell {
  diet?: string;
  type?: string;
}

@Component({
  selector: "app-simulation",
  imports: [NgClass, PopulationChart],
  templateUrl: "./simulation.html",
  styleUrl: "./simulation.css",
})
export class Simulation implements OnInit {
  grid = signal<(GridCell | null)[][]>([]);
  rabbitHistory = signal<number[]>([]);
  wolfHistory = signal<number[]>([]);
  carrotHistory = signal<number[]>([]);

  ngOnInit() {
    const socket = io("http://localhost:3000");

    socket.on("grid", (grid: (GridCell | null)[][]) => {
      this.grid.set(grid);

      const flat = grid.flat();

      const rabbits = flat.filter((cell) => cell?.type === "rabbit").length;
      const wolves = flat.filter((cell) => cell?.type === "wolf").length;
      const carrots = flat.filter((cell) => cell?.type === "carrot").length;

      this.rabbitHistory.update((history) => [...history, rabbits]);
      this.wolfHistory.update((history) => [...history, wolves]);
      this.carrotHistory.update((history) => [...history, carrots]);

      console.log("rabbitHistory:", this.rabbitHistory());
    });
  }
}
