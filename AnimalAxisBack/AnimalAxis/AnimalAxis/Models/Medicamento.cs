using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class Medicamento
    {
        [Key]

        public int Id { get; set; }

        public required String Nome { get; set; }

        public int? TipoMedicamentoId { get; set; }
        public virtual TipoMedicamento? TipoMedicamento { get; set; }
        public virtual IList<RegistroMedicamento>? RegistroMedicamentoList { get; set; }
    }
}
