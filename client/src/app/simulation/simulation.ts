import { Component, OnInit, signal } from "@angular/core";
import { io } from "socket.io-client";
import { NgClass } from "@angular/common";

interface GridCell {
  diet?: string;
}

@Component({
  selector: "app-simulation",
  imports: [NgClass],
  templateUrl: "./simulation.html",
  styleUrl: "./simulation.css",
})
export class Simulation implements OnInit {
  grid = signal<(GridCell | null)[][]>([]);

  ngOnInit() {
    const socket = io("http://localhost:3000");

    socket.on("grid", (grid: (GridCell | null)[][]) => {
      this.grid.set(grid); // met à jour le signal
    });
  }
}
