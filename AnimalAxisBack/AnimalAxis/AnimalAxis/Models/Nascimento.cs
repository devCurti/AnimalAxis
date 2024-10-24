using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class Nascimento
    {
        [Key]
        public int Id { get; set; }

        public int? PaiId { get; set; }
        public virtual Pet? Pai { get; set; }

        public virtual Pet? Mae { get; set; }
        public int? MaeId { get; set; }

        public string? Observacao { get; set; }

        public required int numFilhotes { get; set; }

        public DateTime? PrevisaoNascimento { get; set; }

        public required int UsuarioId { get; set; }
        public virtual Usuario? Usuario { get; set; }
    }
}
