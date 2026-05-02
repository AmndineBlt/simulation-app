import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ISimulationConfig } from "../shared/simulation-config.interface";

@Component({
  selector: "app-simulation-config",
  imports: [FormsModule],
  templateUrl: "./simulation-config.html",
})
export class SimulationConfig {
  @Output() configChanged = new EventEmitter<Partial<ISimulationConfig>>();

  config: ISimulationConfig = {
    gridSize: 10,
    rabbitCount: 5,
    wolfCount: 2,
    carrotCount: 10,
    rabbitReproductionRate: 0.4,
    wolfReproductionRate: 0.2,
    maxCarrots: 20,
  };

  apply() {
    this.configChanged.emit(this.config);
  }
}
