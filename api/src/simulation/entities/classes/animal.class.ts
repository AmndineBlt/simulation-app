import { Entity } from "../interfaces/entity.interface";
import { Diet } from "../enums/diet.enum";
import { Point } from "../types/position.type";

export abstract class Animal implements Entity {
  abstract id: string;
  abstract position: Point;
  abstract isAlive: boolean;
  abstract type: string;
  abstract speed: number;
  abstract stamina: number;
  abstract reproductionRate: number;
  abstract diet: Diet;

  abstract clone(position: Point): Animal;
}
