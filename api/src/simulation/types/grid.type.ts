// La grille, c'est une structure de données qui représente l'espace de la simulation. Ce n'est pas une règle, ni un moteur, c'est une donnée.

import { Entity } from "../entities/interfaces/entity.interface";

// L'entité ou null — on garde toute l'information
export type Grid = (Entity | null)[][];
