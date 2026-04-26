import { Grid } from "../types/grid.type";
import { Animal } from "../entities/classes/animal.class";
import { BaseRule } from "./base.rule";
import { Entity } from "../entities/interfaces/entity.interface";

export class MovementRule extends BaseRule {
  apply(grid: Grid): Grid {
    const movedAnimals = new Set<Animal>();
    this.forEachCell(grid, (cell: Entity | null, i: number, j: number) => {
      if (cell instanceof Animal) {
        const validDirections: number[][] = this.getAdjacentCells(
          grid,
          i,
          j,
          (cell: Entity | null): boolean => cell === null,
        );
        const direction: number[] | undefined =
          this.getRandomDirection(validDirections);

        if (direction && !movedAnimals.has(cell)) {
          // 1. Mettre le lapin sur la nouvelle case
          grid[i + direction[0]][j + direction[1]] = cell;
          // 2. Vider l'ancienne case
          grid[i][j] = null;
          movedAnimals.add(cell); // on marque l'animal déplacé
        }
      }
    });
    return grid;
  }
}
