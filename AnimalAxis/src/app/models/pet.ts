import { Raca } from "./raca"
import { Cor } from "./cor"

export interface Pet {
    Id?: number,
    Nome: string,
    Pedigree?: string,
    Sexo: string,
    RacaId: number,
    DataNascimento: Date,
    Pai?: Pet,
    Mae?: Pet,
    CorId: number,
    PeriodoCruza?: Date,
    DataCio?: Date,
    UsuarioId?: number
}
