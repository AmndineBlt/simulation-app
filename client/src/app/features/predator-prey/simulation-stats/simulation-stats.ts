import { Component, Input } from "@angular/core";
import { StartCard } from "../../../shared/start-card/start-card";

@Component({
  selector: "app-simulation-stats",
  imports: [StartCard],
  templateUrl: "./simulation-stats.html",
  styleUrl: "./simulation-stats.css",
})
export class SimulationStats {
  @Input() rabbits!: number;
  @Input() wolves!: number;
  @Input() carrots!: number;
}
