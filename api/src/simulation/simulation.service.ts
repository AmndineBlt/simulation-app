import { Injectable } from "@nestjs/common";
import { SimulationEngine } from "./engine/simulation.engine";
import { MovementRule } from "./rules/movement.rule";
import { Grid } from "./types/grid.type";
import { Rabbit } from "./entities/classes/rabbit.class";
import { Wolf } from "./entities/classes/wolf.class";
import { Carrot } from "./entities/classes/carrot.class";
import { EatingRule } from "./rules/eating.rule";
import { Point } from "./entities/types/position.type";
import { Entity } from "./entities/interfaces/entity.interface";
import { ReproductionRule } from "./rules/reproduction.rule";
import { EnergyRule } from "./rules/energy.rule";
import { CarrotSpawn } from "./rules/carrot-spawn.rule";

@Injectable()
export class SimulationService {
  // instance privé de SimulationEngine avec MovementRule
  private engine: SimulationEngine = new SimulationEngine([
    new MovementRule(),
    new EatingRule(),
    new ReproductionRule(),
    new EnergyRule(),
    new CarrotSpawn(),
  ]);

  // initialisation de la grille
  init(): void {
    this.engine.init(10, 10);
    this.placeEntities(5, (pos: Point): Rabbit => new Rabbit(pos));
    this.placeEntities(2, (pos: Point): Wolf => new Wolf(pos));
    this.placeEntities(10, (pos: Point): Carrot => new Carrot(pos));
  }

  tick(): Grid {
    this.engine.tick();
    return this.engine.grid;
  }

  private placeEntities(
    count: number,
    createEntity: (position: Point) => Entity,
  ): void {
    let placed: number = 0;
    while (placed < count) {
      const x: number = Math.floor(Math.random() * 10);
      const y: number = Math.floor(Math.random() * 10);
      if (this.engine.grid[y][x] === null) {
        this.engine.placeEntity(createEntity({ x, y }), x, y);
        placed++;
      }
    }
  }
}
