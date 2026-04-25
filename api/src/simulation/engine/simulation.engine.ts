import { Rule } from "../rules/interfaces/rule.interface";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";

export class SimulationEngine {
  grid: Grid;
  constructor(private rules: Rule[]) {}

  init(width: number, height: number): void {
    this.grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => null),
    );
  }

  tick(): void {
    this.rules.forEach((rule: Rule) => {
      this.grid = rule.apply(this.grid);
    });
  }

  placeEntity(entity: Entity, x: number, y: number): void {
    this.grid[y][x] = entity;
  }
}
