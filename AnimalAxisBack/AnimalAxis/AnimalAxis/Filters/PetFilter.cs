using AnimalAxis.DTO;
using AnimalAxis.Models;

namespace AnimalAxis.Filters
{
    public class PetFilter
    {
        public List<PetDto>? Pets { get; set; }
        public string? Nome { get; set; }
        public RacaDto? Raca { get; set; }
        public char? Sexo { get; set; }
    }
}
