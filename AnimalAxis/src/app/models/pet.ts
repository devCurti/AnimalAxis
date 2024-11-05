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
    PeriodoDaCruza?: Date,
    DataDoCio?: Date,
    UsuarioId?: number
}
