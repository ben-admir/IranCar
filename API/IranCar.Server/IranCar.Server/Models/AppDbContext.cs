using Microsoft.EntityFrameworkCore;

namespace IranCar.Server.Models 
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // این خط یعنی ما یک جدول به اسم Cars در دیتابیس می‌خواهیم
        public DbSet<Car> Cars { get; set; }
    }
}