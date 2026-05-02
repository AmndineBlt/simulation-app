import { Rule } from "./interfaces/rule.interface";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";
import { Point } from "../entities/types/position.type";

export abstract class BaseRule implements Rule {
  abstract apply(grid: Grid): Grid;

  protected forEachCell(
    grid: Grid,
    callback: (cell: Entity | null, i: number, j: number) => void,
  ): void {
    grid.forEach((row: (Entity | null)[], i: number) => {
      row.forEach((cell: Entity | null, j: number) => {
        callback(cell, i, j);
      });
    });
  }

  protected getAdjacentCells(
    grid: Grid,
    i: number,
    j: number,
    condition: (cell: Entity | null) => boolean,
  ): number[][] {
    const directions: number[][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const validDirections: number[][] = [];

    directions.forEach((direction: number[]) => {
      const ni: number = i + direction[0];
      const nj: number = j + direction[1];

      const isInBounds: boolean =
        ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length;

      if (isInBounds && condition(grid[ni][nj])) {
        validDirections.push(direction);
      }
    });

    return validDirections;
  }

  protected getRandomDirection(directions: number[][]): number[] | undefined {
    if (directions.length === 0) return undefined;
    const index: number = Math.floor(Math.random() * directions.length);
    return directions[index];
  }

  protected placeEntities(
    grid: Grid,
    count: number,
    createEntity: (position: Point) => Entity,
  ): void {
    let placed: number = 0;
    while (placed < count) {
      const x: number = Math.floor(Math.random() * grid[0].length);
      const y: number = Math.floor(Math.random() * grid.length);
      if (grid[y][x] === null) {
        grid[y][x] = createEntity({ x, y });
        placed++;
      }
    }
  }
}
