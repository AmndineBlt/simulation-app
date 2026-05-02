import { BaseRule } from "./base.rule";
import { Carrot } from "../entities/classes/carrot.class";
import { Grid } from "../types/grid.type";
import { Entity } from "../entities/interfaces/entity.interface";
import { Point } from "../entities/types/position.type";

export class CarrotSpawn extends BaseRule {
  MAX_CARROT: number = 20;

  constructor(private maxCarrots: number) {
    super();
  }

  apply(grid: Grid): Grid {
    // 1. Compter les carottes existantes
    const carrotCount: number = grid
      .flat()
      .filter((cell: Entity | null) => cell instanceof Carrot).length;
    // 2. Si moins que le max → ajouter 2 carottes sur des cases vides aléatoires
    if (carrotCount < 20) {
      this.placeEntities(grid, 2, (pos: Point): Carrot => new Carrot(pos));
    }
    return grid;
  }
}
