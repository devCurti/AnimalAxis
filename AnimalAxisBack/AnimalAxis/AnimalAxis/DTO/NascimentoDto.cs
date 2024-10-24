namespace AnimalAxis.DTO
{
    public class NascimentoDto
    {
        public int Id { get; set; }
        public string? Observacao { get; set; }
        public int numFilhotes { get; set; }
        public DateTime? PrevisaoNascimento { get; set; }
        public string? MaeNome { get; set; }
        public int? PaiId { get; set; }
        public int? MaeId { get; set; }
    }
}
