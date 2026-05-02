import { Point } from "../types/position.type";

export interface Entity {
  id: string;
  position: Point;
  isAlive: boolean;
  type: string;
}
