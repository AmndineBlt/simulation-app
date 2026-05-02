import { Component, inject } from "@angular/core";
import { SimulationCard } from "../../shared/simulation-card/simulation-card";
import { SimulationService } from "../../core/simulation.constant";
import { SimulationCardData } from "../../shared/simulation-card/simulation-card.interface";

@Component({
  selector: "app-home",
  imports: [SimulationCard],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  private simulationService: SimulationService = inject(SimulationService);
  simulations: SimulationCardData[] = this.simulationService.simulations;
}
