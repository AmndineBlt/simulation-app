import { Entity } from "./entity.interface";
import { Diet } from "../enums/diet.enum";

export interface Animal extends Entity {
  speed: number;
  stamina: number;
  reproductionRate: number;
  diet: Diet;
}
