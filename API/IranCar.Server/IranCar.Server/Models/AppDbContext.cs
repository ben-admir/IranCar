using IranCar.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace IranCar.Server.Models 
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }

    }
}