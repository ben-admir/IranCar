using System.ComponentModel.DataAnnotations;

namespace IranCar.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } // باید Name باشه، نه Username
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}