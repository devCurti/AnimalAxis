using AnimalAxis.Models;

namespace AnimalAxis.DTO
{
    public class RegistroMedicamentoDto
    {
        public int Id { get; set; }
        public required DateTime DataAplicacao { get; set; }
        public int? Dose { get; set; }
        public string? PetNome { get; set; }
        public int? PetId { get; set; }
        public int? MedicamentoId { get; set; }
        public String? MedicamentoNome { get; set; }
        public DateTime? DataNascimentoPet { get; set; }
        public String? TipoMedicamentoNome { get; set; }
    }
}
