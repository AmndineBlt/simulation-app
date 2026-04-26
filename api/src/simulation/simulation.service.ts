import { Injectable } from "@nestjs/common";
import { SimulationEngine } from "./engine/simulation.engine";
import { MovementRule } from "./rules/movement.rule";
import { Grid } from "./types/grid.type";
import { Rabbit } from "./entities/classes/rabbit.class";
import { Wolf } from "./entities/classes/wolf.class";

@Injectable()
export class SimulationService {
  // instance privé de SimulationEngine avec MovementRule
  private engine: SimulationEngine = new SimulationEngine([new MovementRule()]);

  // initialisation de la grille
  init(): void {
    this.engine.init(10, 10);
    this.engine.placeEntity(new Rabbit({ x: 2, y: 2 }), 2, 2);
    this.engine.placeEntity(new Wolf({ x: 5, y: 5 }), 5, 5);
    console.log("Grille après init :", this.engine.grid[2][2]);
  }

  tick(): Grid {
    this.engine.tick();
    return this.engine.grid;
  }
}
