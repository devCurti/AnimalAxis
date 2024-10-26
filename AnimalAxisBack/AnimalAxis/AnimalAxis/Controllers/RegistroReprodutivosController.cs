using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalAxis.Data;
using AnimalAxis.Models;
using AnimalAxis.Interfaces;
using AnimalAxis.DTO;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroReprodutivosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public RegistroReprodutivosController(AppDbContext context, IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/RegistroReprodutivos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistroReprodutivoDto>>> GetRegistroReprodutivo()
        {
            var currentUser = _userContext.GetCurrentUserId();
            return await _context.RegistroReprodutivo
            .Where(n => n.UsuarioId == currentUser)
            .Include(p => p.Femea)
            .Include(p => p.Macho)
            .Select(n => new RegistroReprodutivoDto
            {
                Id = n.Id,
                FemeaNome = n.Femea != null ? n.Femea.Nome : null,
                MachoNome = n.Macho != null ? n.Macho.Nome : null,
                DataCio = n.DataDoCio,
                PeriodoCruza = n.PeriodoDeCruz
            })
            .ToListAsync();
        }

        // GET: api/RegistroReprodutivos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroReprodutivo>> GetRegistroReprodutivo(int id)
        {
            var registroReprodutivo = await _context.RegistroReprodutivo.FindAsync(id);

            if (registroReprodutivo == null)
            {
                return NotFound();
            }

            return registroReprodutivo;
        }

        // PUT: api/RegistroReprodutivos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistroReprodutivo(int id, RegistroReprodutivo registroReprodutivo)
        {
            if (id != registroReprodutivo.Id)
            {
                return BadRequest();
            }
            var currentUser = _userContext.GetCurrentUserId();
            registroReprodutivo.UsuarioId = currentUser;
            _context.Entry(registroReprodutivo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroReprodutivoExists(id))
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

        // POST: api/RegistroReprodutivos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegistroReprodutivo>> PostRegistroReprodutivo(RegistroReprodutivo registroReprodutivo)
        {
            var currentUser = _userContext.GetCurrentUserId();
            registroReprodutivo.UsuarioId = currentUser;
            _context.RegistroReprodutivo.Add(registroReprodutivo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistroReprodutivo", new { id = registroReprodutivo.Id }, registroReprodutivo);
        }

        // DELETE: api/RegistroReprodutivos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistroReprodutivo(int id)
        {
            var registroReprodutivo = await _context.RegistroReprodutivo.FindAsync(id);
            if (registroReprodutivo == null)
            {
                return NotFound();
            }

            _context.RegistroReprodutivo.Remove(registroReprodutivo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroReprodutivoExists(int id)
        {
            return _context.RegistroReprodutivo.Any(e => e.Id == id);
        }
    }
}
