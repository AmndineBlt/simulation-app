import { BaseRule } from "./base.rule";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";
import { Animal } from "../entities/classes/animal.class";

export class ReproductionRule extends BaseRule {
  apply(grid: Grid): Grid {
    this.forEachCell(grid, (cell: Entity | null, i: number, j: number) => {
      if (cell instanceof Animal) {
        // 1. Chercher un animal adjacent du même type
        const adjacentSameType: number[][] = this.getAdjacentCells(
          grid,
          i,
          j,
          (adjacentCell: Entity | null): boolean =>
            adjacentCell?.type === cell.type,
        );

        // 2. Chercher une case vide adjacente
        const adjacentEmpty: number[][] = this.getAdjacentCells(
          grid,
          i,
          j,
          (adjacentCell: Entity | null) => adjacentCell === null,
        );

        // 3. Si les deux existent → reproduction
        if (adjacentSameType.length > 0 && adjacentEmpty.length > 0) {
          if (Math.random() < cell.reproductionRate) {
            const emptyDirection: number[] | undefined =
              this.getRandomDirection(adjacentEmpty);
            if (emptyDirection) {
              const newX: number = j + emptyDirection[1];
              const newY: number = i + emptyDirection[0];
              grid[newY][newX] = cell.clone({ x: newX, y: newY });
              cell.stamina -= 2;
            }
          }
        }
      }
    });
    return grid;
  }
}
