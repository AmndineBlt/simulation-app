import { Animal } from "../interfaces/animal.interface";
import { Point } from "../types/position.type";
import { Diet } from "../enums/diet.enum";

export class Rabbit implements Animal {
  id: string = crypto.randomUUID(); // génère un id unique
  isAlive: boolean = true;
  speed: number = 3;
  stamina: number = 10;
  reproductionRate: number = 4;
  diet: Diet = Diet.Herbivore;

  constructor(public position: Point) {}
}
