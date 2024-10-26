using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class TipoMedicamento
    {
        [Key]
        public int Id { get; set; }
        public required string Nome { get; set; }

        public virtual IList<Medicamento>? Medicamentos { get; set; }

    }
}
