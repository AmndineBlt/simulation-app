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
  private socket = io("http://localhost:3000");

  ngOnInit() {
    this.socket.on("grid", (grid: (GridCell | null)[][]) => {
      this.grid.set(grid);

      const flat: (GridCell | null)[] = grid.flat();

      const rabbits: number = flat.filter((cell: GridCell | null): boolean => cell?.type === "rabbit").length;
      const wolves: number = flat.filter((cell: GridCell | null): boolean => cell?.type === "wolf").length;
      const carrots: number = flat.filter((cell: GridCell | null): boolean => cell?.type === "carrot").length;

      this.rabbitHistory.update((history: number[]): number[] => [...history, rabbits]);
      this.wolfHistory.update((history: number[]): number[] => [...history, wolves]);
      this.carrotHistory.update((history: number[]): number[] => [...history, carrots]);
    });
  }

  restart() {
    this.rabbitHistory.set([]);
    this.wolfHistory.set([]);
    this.carrotHistory.set([]);
    this.socket.emit("restart");
  }
}
