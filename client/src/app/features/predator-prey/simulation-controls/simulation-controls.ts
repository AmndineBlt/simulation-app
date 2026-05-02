import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgClass } from "@angular/common";
import { LucideAngularModule, LucideIconData, Pause, Play, RotateCcw } from "lucide-angular";

@Component({
  selector: "app-simulation-controls",
  imports: [NgClass, LucideAngularModule],
  templateUrl: "./simulation-controls.html",
  styleUrl: "./simulation-controls.css",
})
export class SimulationControls {
  @Input() isPaused!: boolean;
  @Input() speed!: number;
  @Output() pauseToggled: EventEmitter<void> = new EventEmitter<void>();
  @Output() restarted: EventEmitter<void> = new EventEmitter<void>();
  @Output() speedChanged: EventEmitter<number> = new EventEmitter<number>();
  isRestarting: boolean = false;
  readonly RotateCcw: LucideIconData = RotateCcw;
  readonly Pause: LucideIconData = Pause;
  readonly Play: LucideIconData = Play;

  onSpeedChange(event: Event) {
    const value: number = +(event.target as HTMLInputElement).value;
    this.speedChanged.emit(value);
  }

  onRestart() {
    this.isRestarting = false;
    setTimeout(() => {
      this.isRestarting = true;
      this.restarted.emit();
      setTimeout(() => {
        this.isRestarting = false;
      }, 600);
    }, 10);
  }
}
