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

        public CarsController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        
        [HttpPost] 
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return Ok(car);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePrice(int id, [FromBody] long newPrice)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();

            car.Price = newPrice;
            await _context.SaveChangesAsync();
            return Ok(car);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return NotFound();

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}