import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";
import { GridCell } from "../simulation/gridCell.interface";

@Component({
  selector: "app-simulation-grid",
  imports: [NgClass],
  templateUrl: "./simulation-grid.html",
})
export class SimulationGrid {
  @Input() grid!: (GridCell | null)[][];
}
