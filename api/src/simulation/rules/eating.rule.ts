import { BaseRule } from "./base.rule";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";
import { Rabbit } from "../entities/classes/rabbit.class";
import { Carrot } from "../entities/classes/carrot.class";
import { Wolf } from "../entities/classes/wolf.class";

export class EatingRule extends BaseRule {
  apply(grid: Grid): Grid {
    this.forEachCell(grid, (cell: Entity | null, i: number, j: number) => {
      if (cell instanceof Wolf) {
        // Lapin adjacent à un loup
        const adjacentRabbits: number[][] = this.getAdjacentCells(
          grid,
          i,
          j,
          (cell: Entity | null): boolean => cell instanceof Rabbit,
        );
        const direction: number[] | undefined =
          this.getRandomDirection(adjacentRabbits);
        if (direction) {
          grid[i + direction[0]][j + direction[1]] = null;
        }
      }

      if (cell instanceof Rabbit) {
        // Carotte adjacente à un lapin
        const adjacentCarrots: number[][] = this.getAdjacentCells(
          grid,
          i,
          j,
          (cell: Entity | null): boolean => cell instanceof Carrot,
        );
        const direction: number[] | undefined =
          this.getRandomDirection(adjacentCarrots);
        if (direction) {
          grid[i + direction[0]][j + direction[1]] = null;
        }
      }
    });
    return grid;
  }
}
