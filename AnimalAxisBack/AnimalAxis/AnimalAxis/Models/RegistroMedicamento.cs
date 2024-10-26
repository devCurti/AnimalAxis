using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class RegistroMedicamento
    {
        [Key]
        public int Id { get; set; } 
        public required DateTime DataAplicacao { get; set; }
        public int? Dose { get; set; }
        public required int PetId { get; set; }
        public virtual Pet? Pet { get; set; }
        public required int MedicamentoId {  get; set; }
        public virtual Medicamento? Medicamento { get; set; }

        public required int UsuarioId { get; set; }
    }
}
