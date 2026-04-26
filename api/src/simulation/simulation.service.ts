import { Injectable } from "@nestjs/common";
import { SimulationEngine } from "./engine/simulation.engine";
import { MovementRule } from "./rules/movement.rule";
import { Grid } from "./types/grid.type";
import { Rabbit } from "./entities/classes/rabbit.class";
import { Wolf } from "./entities/classes/wolf.class";
import { Carrot } from "./entities/classes/carrot.class";

@Injectable()
export class SimulationService {
  // instance privé de SimulationEngine avec MovementRule
  private engine: SimulationEngine = new SimulationEngine([new MovementRule()]);

  // initialisation de la grille
  init(): void {
    this.engine.init(10, 10);
    this.engine.placeEntity(new Rabbit({ x: 2, y: 2 }), 2, 2);
    this.engine.placeEntity(new Rabbit({ x: 1, y: 0 }), 1, 0);
    this.engine.placeEntity(new Wolf({ x: 5, y: 5 }), 5, 5);
    this.engine.placeEntity(new Carrot({ x: 4, y: 3 }), 4, 3);
    this.engine.placeEntity(new Carrot({ x: 0, y: 5 }), 0, 5);
    this.engine.placeEntity(new Carrot({ x: 2, y: 0 }), 2, 0);
    // console.log("Grille après init :", this.engine.grid[2][2]);
  }

  tick(): Grid {
    this.engine.tick();
    return this.engine.grid;
  }
}
