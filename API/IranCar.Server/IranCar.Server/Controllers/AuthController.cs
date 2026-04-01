using IranCar.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IranCar.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context) { _context = context; }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("این ایمیل قبلاً ثبت شده است.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "ثبت‌نام با موفقیت انجام شد" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginInfo)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginInfo.Email && u.Password == loginInfo.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "ایمیل یا رمز عبور اشتباه است." });
            }

            return Ok(new
            {
                userName = user.Name, 
                message = "خوش آمدید!"
            });
        }
    }

    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserRegisterDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}