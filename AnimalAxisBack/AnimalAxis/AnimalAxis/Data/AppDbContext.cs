using AnimalAxis.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalAxis.Data
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration configuration;

        public AppDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("ProdDatabase"));
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
