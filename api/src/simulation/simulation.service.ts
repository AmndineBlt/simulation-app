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
import { Animal } from "./entities/classes/animal.class";

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
      (pos: Point): Rabbit =>
        new Rabbit(pos, this.config.rabbitReproductionRate),
    );
    this.placeEntities(
      this.config.wolfCount,
      (pos: Point): Wolf => new Wolf(pos, this.config.wolfReproductionRate),
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

    const hasAnimals: boolean = this.engine.grid
      .flat()
      .some((cell: Entity | null): boolean => cell instanceof Animal);

    if (!hasAnimals) return this.engine.grid;

    this.engine.tick();
    return this.engine.grid;
  }

  isSimulationOver(): boolean {
    if (!this.engine) return false;

    const flat: (Entity | null)[] = this.engine.grid.flat();

    const hasAnimals: boolean = flat.some(
      (cell: Entity | null) => cell instanceof Animal,
    );
    const hasEmptyCells: boolean = flat.some(
      (cell: Entity | null) => cell === null,
    );

    return !hasAnimals || !hasEmptyCells;
  }

  getSimulationOverReason(): string | null {
    if (!this.engine) return null;

    const flat: (Entity | null)[] = this.engine.grid.flat();
    const hasAnimals: boolean = flat.some(
      (cell: Entity | null) => cell instanceof Animal,
    );
    const hasEmptyCells: boolean = flat.some(
      (cell: Entity | null) => cell === null,
    );

    if (!hasAnimals) return "ALL ANIMALS HAVE PERISHED";
    if (!hasEmptyCells) return "GRID IS FULL — SIMULATION STUCK";
    return null;
  }

  private placeEntities(
    count: number,
    createEntity: (position: Point) => Entity,
  ): void {
    let placed: number = 0;
    let attempts: number = 0;
    const maxAttempts: number = count * 10;

    while (placed < count && attempts < maxAttempts) {
      const x: number = Math.floor(Math.random() * this.config.gridSize);
      const y: number = Math.floor(Math.random() * this.config.gridSize);
      if (this.engine.grid[y][x] === null) {
        this.engine.placeEntity(createEntity({ x, y }), x, y);
        placed++;
      }
      attempts++;
    }
  }
}
