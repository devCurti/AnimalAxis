import { Raca } from "./raca"
import { Cor } from "./cor"

export interface Pet {
    Id?: number,
    Nome: string,
    Pedigree?: string,
    Sexo: string,
    RacaId: number,
    DataNascimento: Date,
    PaiId: Pet,
    MaeId: Pet,
    CorId: number,
    PeriodoCruza?: Date,
    DataCio?: Date,
    UsuarioId?: number
}
