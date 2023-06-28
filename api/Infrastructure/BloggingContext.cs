using Services.Domain;
using Microsoft.EntityFrameworkCore;

namespace Services.Infrastructure
{
    public class BloggingContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("BlogsDb");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Blog>()
                .HasMany(e => e.Posts)
                .WithOne()
                .HasForeignKey(e => e.BlogId)
                .IsRequired();
        }

        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}