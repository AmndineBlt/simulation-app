import { Grid } from "../types/grid.type";
import { Rule } from "./interfaces/rule.interface";
import { Entity } from "../entities/interfaces/entity.interface";
import { Animal } from "../entities/classes/animal.class";

export class MovementRule implements Rule {
  apply(grid: Grid): Grid {
    const movedAnimals = new Set<Animal>();
    grid.forEach((row: (Entity | null)[], i: number) => {
      row.forEach((cell: Entity | null, j: number) => {
        if (cell instanceof Animal) {
          const validDirections: number[][] = this.deplacement(grid, i, j);
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
    });
    return grid;
  }

  deplacement(grid: Grid, i: number, j: number): number[][] {
    const directions: number[][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const validDirection: number[][] = [];

    directions.forEach((direction: number[]) => {
      if (
        i + direction[0] >= 0 &&
        i + direction[0] < grid.length &&
        j + direction[1] >= 0 &&
        j + direction[1] < grid.length &&
        grid[i + direction[0]][j + direction[1]] === null
      ) {
        validDirection.push(direction);
      }
    });

    return validDirection;
  }

  getRandomDirection(directions: number[][]): number[] | undefined {
    if (directions.length === 0) return undefined;
    const index: number = Math.floor(Math.random() * directions.length);
    return directions[index];
  }
}
