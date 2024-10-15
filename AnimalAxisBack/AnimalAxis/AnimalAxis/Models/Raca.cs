using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnimalAxis.Models
{
    public class Raca
    {
        [Key]
        public int Id { get; set; }
        public required string Nome { get; set; }
        [NotMapped]
        public List<Pet>? Pets { get; set; }
    }
}
