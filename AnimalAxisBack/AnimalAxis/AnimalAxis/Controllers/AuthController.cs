using AnimalAxis.Data;
using AnimalAxis.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<Usuario>> Register(Usuario usuario)
        {
            // Verifica se o usuário já existe
            var existingUser = await _context.Usuarios.SingleOrDefaultAsync(u => u.email == usuario.email);
            if (existingUser != null)
            {
                return Conflict("Usuário já existe.");
            }

            // Hash a senha antes de salvar
            usuario.password = BCrypt.Net.BCrypt.HashPassword(usuario.password);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Login), new { id = usuario.id }, usuario);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<object>> Login(Usuario usuario)
        {
            // Valida as credenciais do usuário (com a senha hash)
            var existingUser = await _context.Usuarios.SingleOrDefaultAsync(u => u.email == usuario.email);

            // Verifica se o usuário existe e se a senha está correta
            if (existingUser == null || !BCrypt.Net.BCrypt.Verify(usuario.password, existingUser.password))
            {
                return Unauthorized("Credenciais inválidas.");
            }

            // Gera o token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("sua_chave_secreta_super_secreta_que_tem_mais_de_32_bytes!");
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
            return Ok(new
            {
                Token = token,
                UserId = existingUser.id,
                Email = existingUser.email
            });
        }
    }
}
