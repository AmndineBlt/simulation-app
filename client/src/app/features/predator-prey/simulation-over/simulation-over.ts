import { Component, EventEmitter, Input, Output } from "@angular/core";
import { LucideAngularModule, LucideIconData, RotateCcw, Skull } from "lucide-angular";

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

  readonly Skull: LucideIconData = Skull;
  readonly RotateCcw: LucideIconData = RotateCcw;

  maxOf(history: number[]): number {
    return Math.max(...history, 0);
  }
}
