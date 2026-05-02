import { Component, OnInit, signal } from "@angular/core";
import { io } from "socket.io-client";
import { SimulationConfig } from "../simulation-config/simulation-config";
import { ISimulationConfig } from "../../../shared/simulation-config.interface";
import { SimulationControls } from "../simulation-controls/simulation-controls";
import { GridCell } from "./gridCell.interface";
import { SimulationGrid } from "../simulation-grid/simulation-grid";
import { SimulationStats } from "../simulation-stats/simulation-stats";
import { SimulationChart } from "../simulation-chart/simulation-chart";

@Component({
  selector: "app-simulation",
  imports: [SimulationChart, SimulationConfig, SimulationStats, SimulationControls, SimulationGrid],
  templateUrl: "./simulation.html",
  styleUrl: "./simulation.css",
})
export class Simulation implements OnInit {
  grid = signal<(GridCell | null)[][]>([]);
  rabbitHistory = signal<number[]>([]);
  wolfHistory = signal<number[]>([]);
  carrotHistory = signal<number[]>([]);
  isPaused = signal<boolean>(false);
  speed = signal<number>(1000);
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

  togglePause() {
    // console.log("togglePause appelé, isPaused:", this.isPaused());
    if (this.isPaused()) {
      this.socket.emit("resume");
      this.isPaused.set(false);
    } else {
      this.socket.emit("pause");
      this.isPaused.set(true);
    }
  }

  restart() {
    // console.log("restart appelé");
    this.rabbitHistory.set([]);
    this.wolfHistory.set([]);
    this.carrotHistory.set([]);
    this.socket.emit("restart");
  }

  changeSpeed(value: number) {
    this.speed.set(value);
    this.socket.emit("speed", value);
  }

  updateConfig(config: Partial<ISimulationConfig>) {
    this.socket.emit("updateConfig", config);
    this.socket.emit("restart");
    this.rabbitHistory.set([]);
    this.wolfHistory.set([]);
    this.carrotHistory.set([]);
  }
}
