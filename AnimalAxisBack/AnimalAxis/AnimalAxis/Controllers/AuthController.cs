using AnimalAxis.Data;
using AnimalAxis.Models;
using AnimalAxis.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Interfaces.IUserContext _userContext;

        public AuthController(AppDbContext context, Interfaces.IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(Usuario usuario)
        {

            var existingUser = await _context.Usuarios.SingleOrDefaultAsync(u => u.email == usuario.email);
            if (existingUser != null)
            {
                return Conflict("Usuário já existe.");
            }


            usuario.password = BCrypt.Net.BCrypt.HashPassword(usuario.password);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Login), new { id = usuario.id }, usuario);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<object>> Login(Usuario usuario)
        {
            if (usuario == null || string.IsNullOrEmpty(usuario.email) || string.IsNullOrEmpty(usuario.password))
            {
                return BadRequest("Credenciais inválidas.");
            }

            var existingUser = await _context.Usuarios.SingleOrDefaultAsync(u => u.email == usuario.email);

            if (existingUser == null || !BCrypt.Net.BCrypt.Verify(usuario.password, existingUser.password))
            {
                return Unauthorized("Credenciais inválidas.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("jF9k8NqZ7LxW2bR6cT4yHpS1mE5vQwU3");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, existingUser.id.ToString()),
            new Claim(ClaimTypes.Email, existingUser.email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Token = tokenString,
                UserId = existingUser.id,
                Email = existingUser.email
            });
        }


        [HttpGet("verifyAuth")]
        public IActionResult VerifyAuth()
        {
            var userId = _userContext.GetCurrentUserId();

            if (userId == -1)
            {
                throw new UnauthorizedAccessException("Não autorizado.");
            }

            return Ok(true);
        }

    }
}
