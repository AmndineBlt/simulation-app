import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Grid2x2, LucideAngularModule, LucideIconData, RotateCcw, Skull } from "lucide-angular";

@Component({
  selector: "app-simulation-over",
  imports: [LucideAngularModule],
  templateUrl: "./simulation-over.html",
  styleUrl: "./simulation-over.css",
})
export class SimulationOver {
  @Input() rabbitHistory!: number[];
  @Input() wolfHistory!: number[];
  @Output() restarted: EventEmitter<void> = new EventEmitter<void>();
  @Input() reason!: string;

  readonly Skull: LucideIconData = Skull;
  readonly Grid2x2: LucideIconData = Grid2x2;
  readonly RotateCcw: LucideIconData = RotateCcw;

  maxOf(history: number[]): number {
    return Math.max(...history, 0);
  }

  ngOnInit() {
    console.log("reason:", this.reason);
  }
}
