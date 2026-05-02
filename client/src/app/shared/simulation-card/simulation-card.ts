import { Component, Input } from "@angular/core";
import { SimulationCardData } from "./simulation-card.interface";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-simulation-card",
  imports: [RouterLink],
  templateUrl: "./simulation-card.html",
  styleUrl: "./simulation-card.css",
})
export class SimulationCard {
  @Input() simulation!: SimulationCardData;
}
