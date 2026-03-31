using Microsoft.AspNetCore.Mvc;

namespace IranCar.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto loginData)
        {
            if (string.IsNullOrEmpty(loginData.Username) || string.IsNullOrEmpty(loginData.Password))
                return BadRequest("نام کاربری و رمز عبور الزامی است.");

            return Ok(new { message = "ورود موفقیت‌آمیز" });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterDto registerData)
        {
            return Ok(new { message = "ثبت‌نام با موفقیت انجام شد" });
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