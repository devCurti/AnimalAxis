export interface RegistroMedicamento {
    id?: number,
    medicamentoId: number,
    petId: number,
    dataAplicacao: Date,
    usuarioId: number,
    dose: number
}
