import { BaseRule } from "./base.rule";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";
import { Animal } from "../entities/classes/animal.class";

export class EnergyRule extends BaseRule {
  apply(grid: Grid): Grid {
    this.forEachCell(grid, (cell: Entity | null, i: number, j: number) => {
      if (cell instanceof Animal) {
        cell.stamina -= 1;

        if (cell.stamina <= 0) {
          cell.isAlive = false;
          grid[i][j] = null;
        }
      }
    });
    return grid;
  }
}
