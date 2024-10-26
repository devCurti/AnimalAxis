namespace AnimalAxis.DTO
{
    public class RegistroReprodutivoDto
    {
        public int Id { get; set; }
        public string? FemeaNome { get; set; }
        public string? MachoNome { get; set; }
        public DateTime? DataCio { get; set; }
        public DateTime? PeriodoCruza { get; set; }
    }
}
