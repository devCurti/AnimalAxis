using AnimalAxis.Models;

namespace AnimalAxis.DTO
{
    public class PetDto
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Pedigree { get; set; }
        public required char Sexo { get; set; }
        public DateTime? DataNascimento { get; set; }
        public PetDto? Pai { get; set; }
        public PetDto? Mae { get; set; }
        public RacaDto? Raca { get; set; }
        public CorDto? Cor { get; set; }
        public DateTime? PeriodoDaCruza { get; set; }

        public DateTime? DataDoCio { get; set; }

        public static implicit operator PetDto?(RacaDto? v)
        {
            throw new NotImplementedException();
        }
    }
}
