using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimalAxis.Data;
using AnimalAxis.Models;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoMedicamentosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TipoMedicamentosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TipoMedicamentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoMedicamento>>> GetTipoMedicamento()
        {
            return await _context.TipoMedicamento.ToListAsync();
        }

        // GET: api/TipoMedicamentos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoMedicamento>> GetTipoMedicamento(int id)
        {
            var tipoMedicamento = await _context.TipoMedicamento.FindAsync(id);

            if (tipoMedicamento == null)
            {
                return NotFound();
            }

            return tipoMedicamento;
        }

        // PUT: api/TipoMedicamentos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoMedicamento(int id, TipoMedicamento tipoMedicamento)
        {
            if (id != tipoMedicamento.Id)
            {
                return BadRequest();
            }

            _context.Entry(tipoMedicamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoMedicamentoExists(id))
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

        // POST: api/TipoMedicamentos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TipoMedicamento>> PostTipoMedicamento(TipoMedicamento tipoMedicamento)
        {
            _context.TipoMedicamento.Add(tipoMedicamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipoMedicamento", new { id = tipoMedicamento.Id }, tipoMedicamento);
        }

        // DELETE: api/TipoMedicamentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoMedicamento(int id)
        {
            var tipoMedicamento = await _context.TipoMedicamento.FindAsync(id);
            if (tipoMedicamento == null)
            {
                return NotFound();
            }

            _context.TipoMedicamento.Remove(tipoMedicamento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TipoMedicamentoExists(int id)
        {
            return _context.TipoMedicamento.Any(e => e.Id == id);
        }
    }
}
