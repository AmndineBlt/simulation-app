import { Grid } from "../../types/grid.type";

export interface Rule {
  apply(grid: Grid): Grid;
}
