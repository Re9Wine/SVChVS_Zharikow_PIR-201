using ishop.Domain.Entity;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ishop.DAL
{
    public partial class ishopContext : DbContext
    {
        public ishopContext()
        {

        }

        public ishopContext(DbContextOptions<ishopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Sneaker> Sneakers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-RTPDA1J;Database=ishop;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Sneaker>(entity =>
            {
                entity.ToTable("Sneaker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Cost).HasColumnName("cost");

                entity.Property(e => e.Count).HasColumnName("count");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Photo)
                    .IsRequired()
                    .HasColumnName("photo");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
