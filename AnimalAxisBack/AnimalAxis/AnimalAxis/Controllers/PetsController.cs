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
using AnimalAxis.Services;
using System.Security.Claims;
using AnimalAxis.DTO;

namespace AnimalAxis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public PetsController(AppDbContext context, IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        // GET: api/Pets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pet>>> GetPet()
        {
            var currentUser = _userContext.GetCurrentUserId();
            /*var pets = await _context.Pet
                .Where(p => p.UsuarioId == currentUser)
                .Include(p => p.Raca).ThenInclude(p => p.Nome)
                .Include(p => p.Cor)
                .Include(p => p.Pai)
                .Include(p => p.Mae)
                .ToListAsync();*/
            var pets = await _context.Pet
                .Where(p => p.UsuarioId == currentUser)
                .Include(p => p.Raca)
                .Select(p => new PetDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Raca = p.Raca != null ? new RacaDto
                    {
                        Id = p.Raca.Id,
                        Nome = p.Raca.Nome
                    } : null,
                    Sexo = p.Sexo,
                    Pedigree = p.Pedigree,
                    DataNascimento = p.DataNascimento,
                    DataDoCio = p.DataDoCio,
                    PeriodoDaCruza = p.PeriodoDaCruza,
                    Pai = p.Pai != null ? new PetDto
                    {
                        Id = p.Pai.Id,
                        Nome = p.Pai.Nome,
                        Sexo = p.Sexo
                    } : null,
                    Mae = p.Mae != null ? new PetDto
                    {
                        Id = p.Mae.Id,
                        Nome = p.Mae.Nome,
                        Sexo = p.Sexo
                    } : null,
                    Cor = p.Cor != null ? new CorDto
                    {
                        Id = p.Cor.Id,
                        Nome = p.Nome
                    } : null

                })
                .ToListAsync();

            return Ok(pets);
        }

        // GET: api/Pets/machos
        [HttpGet("machos")]
        public async Task<ActionResult<IEnumerable<Pet>>> GetPetMachos()
        {
            var currentUser = _userContext.GetCurrentUserId();
            var pets = await _context.Pet
                .Where(p => p.UsuarioId == currentUser && p.Sexo == 'M')
                .ToListAsync();



            return Ok(pets);
        }

        // GET: api/Pets/femeas
        [HttpGet("femeas")]
        public async Task<ActionResult<IEnumerable<Pet>>> GetPetFemeas()
        {
            var currentUser = _userContext.GetCurrentUserId();
            var pets = await _context.Pet
                .Where(p => p.UsuarioId == currentUser && p.Sexo == 'F')
                .ToListAsync();



            return Ok(pets);
        }

        // GET: api/Pets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PetDto>> GetPet(int id)
        {
            var currentUser = _userContext.GetCurrentUserId();
            var pet = await _context.Pet
                .Where(p => p.UsuarioId == currentUser && p.Id == id)
                .Include(p => p.Raca)
                .Include(p => p.Pai)
                .Include(p => p.Mae)
                .Include(p => p.Cor)
                .Select(p => new PetDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Raca = p.Raca != null ? new RacaDto
                    {
                        Id = p.Raca.Id,
                        Nome = p.Raca.Nome
                    } : null,
                    Sexo = p.Sexo,
                    Pedigree = p.Pedigree,
                    DataNascimento = p.DataNascimento,
                    DataDoCio = p.DataDoCio,
                    PeriodoDaCruza = p.PeriodoDaCruza,
                    Pai = p.Pai != null ? new PetDto
                    {
                        Id = p.Pai.Id,
                        Nome = p.Pai.Nome,
                        Sexo = p.Pai.Sexo // Corrigido para usar p.Pai.Sexo
                    } : null,
                    Mae = p.Mae != null ? new PetDto
                    {
                        Id = p.Mae.Id,
                        Nome = p.Mae.Nome,
                        Sexo = p.Mae.Sexo // Corrigido para usar p.Mae.Sexo
                    } : null,
                    Cor = p.Cor != null ? new CorDto
                    {
                        Id = p.Cor.Id,
                        Nome = p.Cor.Nome // Corrigido para usar p.Cor.Nome
                    } : null
                })
                .FirstOrDefaultAsync(); // Altera para FirstOrDefaultAsync para obter um único resultado

            if (pet == null)
            {
                return NotFound();
            }

            return pet;
        }

        // PUT: api/Pets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPet(int id, Pet pet)
        {
            if (id != pet.Id)
            {
                return BadRequest();
            }

            _context.Entry(pet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PetExists(id))
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

        // POST: api/Pets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pet>> PostPet(Pet pet)
        {

            var currentUser = _userContext.GetCurrentUserId();
            pet.UsuarioId = currentUser;
            _context.Pet.Add(pet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPet", pet);
        }

        // DELETE: api/Pets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _context.Pet.FindAsync(id);
            if (pet == null)
            {
                return NotFound();
            }

            _context.Pet.Remove(pet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PetExists(int id)
        {
            return _context.Pet.Any(e => e.Id == id);
        }
    }
}
