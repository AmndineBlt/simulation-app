import { Injectable } from "@nestjs/common";
import { SimulationEngine } from "./engine/simulation.engine";
import { Grid } from "./types/grid.type";
import { Rabbit } from "./entities/classes/rabbit.class";
import { Wolf } from "./entities/classes/wolf.class";
import { Carrot } from "./entities/classes/carrot.class";
import { Point } from "./entities/types/position.type";
import { Entity } from "./entities/interfaces/entity.interface";
import { DEFAULT_CONFIG, SimulationConfig } from "./simulation.config";
import { MovementRule } from "./rules/movement.rule";
import { EatingRule } from "./rules/eating.rule";
import { ReproductionRule } from "./rules/reproduction.rule";
import { EnergyRule } from "./rules/energy.rule";
import { CarrotSpawn } from "./rules/carrot-spawn.rule";

@Injectable()
export class SimulationService {
  private config: SimulationConfig = { ...DEFAULT_CONFIG };
  private engine!: SimulationEngine;

  // initialisation de la grille
  init(): void {
    this.engine = new SimulationEngine([
      new MovementRule(),
      new EatingRule(),
      new ReproductionRule(),
      new EnergyRule(),
      new CarrotSpawn(this.config.maxCarrots),
    ]);
    this.engine.init(this.config.gridSize, this.config.gridSize);
    this.placeEntities(
      this.config.rabbitCount,
      (pos) => new Rabbit(pos, this.config.rabbitReproductionRate),
    );
    this.placeEntities(
      this.config.wolfCount,
      (pos) => new Wolf(pos, this.config.wolfReproductionRate),
    );
    this.placeEntities(
      this.config.carrotCount,
      (pos: Point): Carrot => new Carrot(pos),
    );
  }

  updateConfig(config: Partial<SimulationConfig>): void {
    this.config = { ...this.config, ...config };
  }

  tick(): Grid {
    if (!this.engine) return [];
    this.engine.tick();
    return this.engine.grid;
  }

  private placeEntities(
    count: number,
    createEntity: (position: Point) => Entity,
  ): void {
    let placed: number = 0;
    while (placed < count) {
      const x: number = Math.floor(Math.random() * this.config.gridSize);
      const y: number = Math.floor(Math.random() * this.config.gridSize);
      if (this.engine.grid[y][x] === null) {
        this.engine.placeEntity(createEntity({ x, y }), x, y);
        placed++;
      }
    }
  }
}
