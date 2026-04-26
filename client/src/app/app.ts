import { Component, signal } from "@angular/core";
import { Simulation } from "./simulation/simulation";

@Component({
  selector: "app-root",
  imports: [Simulation],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("client");
}
