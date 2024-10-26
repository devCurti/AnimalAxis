using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class RegistroReprodutivo
    {
        [Key]
        public int Id { get; set; }
        public int FemeaId { get; set; }
        public virtual Pet? Femea { get; set; }
        public int MachoId { get; set; }
        public virtual Pet? Macho { get; set; }
        public required DateTime DataDoCio { get; set; }
        public required DateTime PeriodoDeCruz { get; set; }
        public required int UsuarioId { get; set; }
        public virtual Usuario? Usuario { get; set; }

    }
}