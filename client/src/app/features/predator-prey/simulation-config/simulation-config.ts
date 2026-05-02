import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ISimulationConfig } from "../../../shared/simulation-config.interface";
import { Check, LucideAngularModule, LucideIconData } from "lucide-angular";

@Component({
  selector: "app-simulation-config",
  imports: [FormsModule, LucideAngularModule],
  templateUrl: "./simulation-config.html",
})
export class SimulationConfig {
  @Output() configChanged = new EventEmitter<Partial<ISimulationConfig>>();
  readonly Apply: LucideIconData = Check;
  isRestarting: boolean = false;

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
    this.isRestarting = false;
    setTimeout(() => {
      this.isRestarting = true;
      this.configChanged.emit(this.config);
      setTimeout(() => {
        this.isRestarting = false;
      }, 600);
    }, 10);
  }
}
