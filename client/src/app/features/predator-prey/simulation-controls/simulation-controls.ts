import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-simulation-controls",
  imports: [NgClass],
  templateUrl: "./simulation-controls.html",
  styleUrl: "./simulation-controls.css",
})
export class SimulationControls {
  @Input() isPaused!: boolean;
  @Input() speed!: number;
  @Output() pauseToggled: EventEmitter<void> = new EventEmitter<void>();
  @Output() restarted: EventEmitter<void> = new EventEmitter<void>();
  @Output() speedChanged: EventEmitter<number> = new EventEmitter<number>();

  onSpeedChange(event: Event) {
    const value: number = +(event.target as HTMLInputElement).value;
    this.speedChanged.emit(value);
  }
}
