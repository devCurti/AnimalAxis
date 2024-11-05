import { Pet } from "../pet";
import { Raca } from "../raca";

export interface PetFilter {
    pets?: Pet[],
    nome: string,
    raca: Raca,
    sexo: string
}
