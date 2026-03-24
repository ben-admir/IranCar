namespace IranCar.Server.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string? Brand { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }
        public long Price { get; set; }
        public int Year { get; set; }
    }
}