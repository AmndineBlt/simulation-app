import { Component, Input } from "@angular/core";
import { PopulationChart } from "../population-chart/population-chart";

@Component({
  selector: "app-simulation-chart",
  imports: [PopulationChart],
  templateUrl: "./simulation-chart.html",
  styleUrl: "./simulation-chart.css",
})
export class SimulationChart {
  @Input() rabbits!: number[];
  @Input() wolves!: number[];
  @Input() carrots!: number[];
}
