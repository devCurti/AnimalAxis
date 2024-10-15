using System.ComponentModel.DataAnnotations;

namespace AnimalAxis.Models
{
    public class Usuario
    {
        [Key]
        public int id { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? name { get; set; }
        public virtual List<Pet> Pets { get; set; } = new();

    }
}
