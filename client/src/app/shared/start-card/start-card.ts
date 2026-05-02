import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-start-card",
  imports: [NgClass],
  templateUrl: "./start-card.html",
  styleUrl: "./start-card.css",
})
export class StartCard {
  @Input() label!: string;
  @Input() value!: number;
  @Input() color!: "rabbit" | "wolf" | "carrot";
}
