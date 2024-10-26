using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnimalAxis.Models
{
    public class Pet
    {
        [Key]
        public int Id { get; set; }

        public string? Pedigree { get; set; }

        public required string Nome { get; set; }

        public required char Sexo { get; set; }

        public required int RacaId { get; set; }
        public virtual Raca? Raca { get; set; }

        public DateTime? DataNascimento { get; set; }

        public int? PaiId { get; set; }
        public int? MaeId { get; set; }

        public virtual Pet? Pai { get; set; }
        public virtual Pet? Mae { get; set; }

        public required int CorId { get; set; }
        public virtual Cor? Cor { get; set; }

        public DateTime? PeriodoDaCruza { get; set; }

        public DateTime? DataDoCio { get; set; }
        public required int UsuarioId { get; set; }
        public virtual Usuario? Usuario { get; set; }
        public virtual IList<Nascimento>? Nascimento { get; set; }

        public virtual IList<RegistroMedicamento>? RegistroMedicamento { get; set; }
    }
}
