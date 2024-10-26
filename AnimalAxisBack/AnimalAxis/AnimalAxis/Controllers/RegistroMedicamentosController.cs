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
    public class RegistroMedicamentosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public RegistroMedicamentosController(AppDbContext context, IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/RegistroMedicamentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistroMedicamentoDto>>> GetRegistroMedicamento()
        {
            var currentUser = _userContext.GetCurrentUserId();
            return await _context.RegistroMedicamento
            .Where(n => n.UsuarioId == currentUser)
            .Include(p => p.Pet)
            .Select(n => new RegistroMedicamentoDto
            {
                Id = n.Id,
                DataAplicacao = n.DataAplicacao,
                Dose = n.Dose,
                PetNome = n.Pet != null ? n.Pet.Nome : null,
                MedicamentoNome = n.Medicamento != null ? n.Medicamento.Nome : null,
                DataNascimentoPet = n.Pet != null ? n.Pet.DataNascimento : null,
                TipoMedicamentoNome = n.Medicamento != null && n.Medicamento.TipoMedicamento != null ? n.Medicamento.TipoMedicamento.Nome : null

            })
            .ToListAsync();
        }

        // GET: api/RegistroMedicamentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroMedicamento>> GetRegistroMedicamento(int id)
        {
            var registroMedicamento = await _context.RegistroMedicamento.FindAsync(id);

            if (registroMedicamento == null)
            {
                return NotFound();
            }

            return registroMedicamento;
        }

        // PUT: api/RegistroMedicamentos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistroMedicamento(int id, RegistroMedicamento registroMedicamento)
        {
            if (id != registroMedicamento.Id)
            {
                return BadRequest();
            }
            var currentUser = _userContext.GetCurrentUserId();
            registroMedicamento.UsuarioId = currentUser;

            _context.Entry(registroMedicamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroMedicamentoExists(id))
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

        // POST: api/RegistroMedicamentos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegistroMedicamento>> PostRegistroMedicamento(RegistroMedicamento registroMedicamento)
        {
            var currentUser = _userContext.GetCurrentUserId();
            registroMedicamento.UsuarioId = currentUser;
            _context.RegistroMedicamento.Add(registroMedicamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistroMedicamento", new { id = registroMedicamento.Id }, registroMedicamento);
        }

        // DELETE: api/RegistroMedicamentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistroMedicamento(int id)
        {
            var registroMedicamento = await _context.RegistroMedicamento.FindAsync(id);
            if (registroMedicamento == null)
            {
                return NotFound();
            }

            _context.RegistroMedicamento.Remove(registroMedicamento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroMedicamentoExists(int id)
        {
            return _context.RegistroMedicamento.Any(e => e.Id == id);
        }
    }
}
