import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { SimulationService } from "../simulation.constant";

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.html",
})
export class Navbar {
  private simulationService = inject(SimulationService);
  simulations = this.simulationService.simulations;
  private router = inject(Router);

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
