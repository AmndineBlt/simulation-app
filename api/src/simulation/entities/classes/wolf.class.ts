import { Animal } from "./animal.class";
import { Point } from "../types/position.type";
import { Diet } from "../enums/diet.enum";

export class Wolf extends Animal {
  id: string = crypto.randomUUID(); // génère un id unique
  isAlive: boolean = true;
  speed: number = 2;
  stamina: number = 15;
  reproductionRate: number = 2;
  diet: Diet = Diet.Carnivore;
  type: string = "wolf";

  constructor(public position: Point) {
    super(); // appel au constructeur parent
  }
}
