import { Entity } from "../interfaces/entity.interface";
import { Point } from "../types/position.type";

export class Carrot implements Entity {
  id: string = crypto.randomUUID();
  isAlive: boolean = true;

  constructor(public position: Point) {}
}
