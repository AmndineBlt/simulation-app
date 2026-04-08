import { Animal } from "../interfaces/animal.interface";
import { Point } from "../types/position.type";
import { Diet } from "../enums/diet.enum";

export class Wolf implements Animal {
  id: string = crypto.randomUUID(); // génère un id unique
  isAlive: boolean = true;
  speed: number = 2;
  stamina: number = 15;
  reproductionRate: number = 2;
  diet: Diet = Diet.Carnivore;

  constructor(public position: Point) {}
}
