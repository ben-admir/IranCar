using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IranCar.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public Func<AppDbContext> ContextFactory { get; }

    public UsersController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {

        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
        {
            return BadRequest("این ایمیل قبلاً ثبت شده است!");
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "ثبت‌نام با موفقیت انجام شد!" });
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User loginDto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

        if (user == null)
        {
            return Unauthorized("ایمیل یا رمز عبور اشتباه است!");
        }

        return Ok(new { message = "خوش آمدید!", userName = user.Name });
    }
}