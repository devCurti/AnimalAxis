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
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("database"));
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}
