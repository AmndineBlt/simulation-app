// La grille c'est une structure de données qui représente l'espace de la simulation. Ce n'est pas une règle, ni un moteur, c'est une donnée.

import { Animal } from "../entities/interfaces/animal.interface";

// L'entité ou null — on garde toute l'information
type Grid = (Animal | null)[][];
