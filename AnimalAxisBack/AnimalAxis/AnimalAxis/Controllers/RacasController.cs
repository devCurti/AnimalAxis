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

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RacasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RacasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Racas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RacaDto>>> GetRaca()
        {
            var racas = await _context.Raca
                .Select(p => new RacaDto
                {
                    Id = p.Id,
                    Nome = p.Nome
                })
                .ToListAsync();

            return Ok(racas);
        }

        // GET: api/Racas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Raca>> GetRaca(int id)
        {
            var raca = await _context.Raca.FindAsync(id);

            if (raca == null)
            {
                return NotFound();
            }

            return raca;
        }

        // PUT: api/Racas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRaca(int id, Raca raca)
        {
            if (id != raca.Id)
            {
                return BadRequest();
            }

            _context.Entry(raca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RacaExists(id))
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

        // POST: api/Racas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Raca>> PostRaca(Raca raca)
        {
            _context.Raca.Add(raca);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRaca", new { id = raca.Id }, raca);
        }

        // DELETE: api/Racas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRaca(int id)
        {
            var raca = await _context.Raca.FindAsync(id);
            if (raca == null)
            {
                return NotFound();
            }

            _context.Raca.Remove(raca);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RacaExists(int id)
        {
            return _context.Raca.Any(e => e.Id == id);
        }
    }
}
