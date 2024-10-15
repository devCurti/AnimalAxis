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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pet>()
                .HasOne(p => p.Pai)
                .WithMany()
                .HasForeignKey(p => p.PaiId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Pet>()
                .HasOne(p => p.Mae)
                .WithMany()
                .HasForeignKey(p => p.MaeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Pet>()
            .HasOne(p => p.Cor)
            .WithMany(c => c.Pets)
            .HasForeignKey(p => p.CorId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Pet>()
            .HasOne(p => p.Raca)
            .WithMany(c => c.Pets)
            .HasForeignKey(p => p.RacaId)
            .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<AnimalAxis.Models.Pet> Pet { get; set; } = default!;
        public DbSet<AnimalAxis.Models.Raca> Raca { get; set; } = default!;
        public DbSet<AnimalAxis.Models.Cor> Cor { get; set; } = default!;
    }
}
