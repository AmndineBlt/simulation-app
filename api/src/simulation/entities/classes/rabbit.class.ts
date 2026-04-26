import { Animal } from "./animal.class";
import { Point } from "../types/position.type";
import { Diet } from "../enums/diet.enum";

export class Rabbit extends Animal {
  id: string = crypto.randomUUID(); // génère un id unique
  isAlive: boolean = true;
  speed: number = 3;
  stamina: number = 10;
  reproductionRate: number = 4;
  diet: Diet = Diet.Herbivore;
  type: string = "rabbit";

  constructor(public position: Point) {
    super(); // appel au constructeur parent
  }
}
