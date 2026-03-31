using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IranCar.Server.Models;

namespace IranCar.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CarsController(AppDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();
            return car;
        }

        [HttpPost]
        public async Task<ActionResult<Car>> PostCar([FromForm] CarCreateDto carDto)
        {
            try
            {
                var car = new Car
                {
                    Brand = carDto.Brand,
                    Name = carDto.Name,
                    Price = carDto.Price,
                    Color = carDto.Color,
                    Year = carDto.Year
                };

                if (carDto.ImageFile != null)
                {
                    var rootPath = _webHostEnvironment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    string uploadsFolder = Path.Combine(rootPath, "images");
                    if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(carDto.ImageFile.FileName);
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await carDto.ImageFile.CopyToAsync(fileStream);
                    }
                    car.ImageName = fileName;
                }

                _context.Cars.Add(car);
                await _context.SaveChangesAsync();
                return Ok(car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"خطای سرور: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, [FromForm] CarCreateDto carDto)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();

            car.Brand = carDto.Brand;
            car.Name = carDto.Name;
            car.Price = carDto.Price;
            car.Color = carDto.Color;
            car.ImageFile = carDto.ImageFile;
            car.Year = carDto.Year;

            if (carDto.ImageFile != null)
            {
                var rootPath = _webHostEnvironment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(carDto.ImageFile.FileName);
                string filePath = Path.Combine(rootPath, "images", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await carDto.ImageFile.CopyToAsync(fileStream);
                }
                car.ImageName = fileName;
            }

            _context.Entry(car).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(car.ImageName))
            {
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", car.ImageName);
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }

    public class CarCreateDto
    {
        public string? Brand { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }
        public long Price { get; set; }
        public int Year { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}