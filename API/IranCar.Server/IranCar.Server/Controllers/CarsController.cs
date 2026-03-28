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

        [HttpPost]
        public async Task<ActionResult<Car>> PostCar([FromForm] Car car)
        {
            try
            {
                if (car.ImageFile != null)
                {
                    var rootPath = _webHostEnvironment.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                    string uploadsFolder = Path.Combine(rootPath, "images");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(car.ImageFile.FileName);
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await car.ImageFile.CopyToAsync(fileStream);
                    }

                    car.ImageName = fileName;
                }

                _context.Cars.Add(car);
                await _context.SaveChangesAsync();

                return Ok(car);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"خطای سرور: {ex.Message} Inner: {ex.InnerException?.Message}");
            }
        }
    }
}