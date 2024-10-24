using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalAxis.Data;
using AnimalAxis.Models;
using AnimalAxis.DTO;
using System.Drawing;
using AnimalAxis.Interfaces;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NascimentosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public NascimentosController(AppDbContext context, IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Nascimentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NascimentoDto>>> GetNascimento()
        {
            var currentUser = _userContext.GetCurrentUserId();
            return await _context.Nascimento
            .Where(n => n.UsuarioId == currentUser)
            .Include(p => p.Mae)
            .Select(n => new NascimentoDto
            {
                Id = n.Id,
                Observacao = n.Observacao,
                numFilhotes = n.numFilhotes,
                PrevisaoNascimento = n.PrevisaoNascimento,
                MaeNome = n.Mae != null ? n.Mae.Nome : null
            })
            .ToListAsync();
        }

        // GET: api/Nascimentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NascimentoDto>> GetNascimento(int id)
        {
            var currentUser = _userContext.GetCurrentUserId();
            var nascimento = await _context.Nascimento
                
            .Where(n => n.Id == id && n.UsuarioId == currentUser)
            .Select(n => new NascimentoDto
            {
                Id = n.Id,
                Observacao = n.Observacao,
                numFilhotes = n.numFilhotes,
                PrevisaoNascimento = n.PrevisaoNascimento,
                MaeId = n.Mae != null ? n.MaeId : null,
                PaiId = n.Pai != null ? n.PaiId: null 
            })
            .FirstOrDefaultAsync();

            if (nascimento == null)
            {
                return NotFound();
            }

            return Ok(nascimento); // Retorna o NascimentoDto
        }

        // PUT: api/Nascimentos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNascimento(int id, Nascimento nascimento)
        {
            var currentUser = _userContext.GetCurrentUserId();
            nascimento.UsuarioId = currentUser;

            if (id != nascimento.Id)
            {
                return BadRequest();
            }

            _context.Entry(nascimento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NascimentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Nascimentos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Nascimento>> PostNascimento(Nascimento nascimento)
        {
            var currentUser = _userContext.GetCurrentUserId();
            nascimento.UsuarioId = currentUser;
            _context.Nascimento.Add(nascimento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNascimento", new { id = nascimento.Id }, nascimento);
        }

        // DELETE: api/Nascimentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNascimento(int id)
        {
            var nascimento = await _context.Nascimento.FindAsync(id);
            if (nascimento == null)
            {
                return NotFound();
            }

            _context.Nascimento.Remove(nascimento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NascimentoExists(int id)
        {
            return _context.Nascimento.Any(e => e.Id == id);
        }
    }
}
