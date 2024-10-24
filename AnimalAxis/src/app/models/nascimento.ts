export interface Nascimento {
    id?: number,
    paiId: number,
    maeId: number,
    observacao: string,
    numFilhotes: number,
    previsaoNascimento: Date,
    usuarioId: number
}
