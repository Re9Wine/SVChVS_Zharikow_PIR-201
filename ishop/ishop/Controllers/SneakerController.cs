using ishop.DAL.Interfaces;
using ishop.Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ishop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SneakerController : ControllerBase
    {
        private readonly ISneakerRepository _repository;

        public SneakerController(ISneakerRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<Sneaker>> GetAsync()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<Sneaker> GetAsync(int id)
        {
            return await _repository.Get(id);
        }

        [HttpPost]
        public async Task PostAsync([FromBody] Sneaker sneaker)
        {
            await _repository.Create(sneaker);
        }

        [HttpPut]
        public async Task PutAsync([FromBody] Sneaker editSneaker)
        {
            var uneditSneaker = await _repository.Get(editSneaker.Id);

            await _repository.Update(uneditSneaker, editSneaker);
        }

        [HttpDelete]
        public async Task DeleteAsync([FromBody] int id)
        {
            var deletedElement = await _repository.Get(id);

            await _repository.Delete(deletedElement);
        }
    }
}
