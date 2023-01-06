using ishop.DAL.Interfaces;
using ishop.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ishop.DAL.Repositories
{
    public class SneakerRepository : ISneakerRepository
    {
        private readonly ishopContext _db;

        public SneakerRepository(ishopContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(Sneaker entity)
        {
            entity.Id = _db.Sneakers.Count() + 1;
            await _db.Sneakers.AddAsync(entity);

            if (await _db.SaveChangesAsync() == 0)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> Delete(Sneaker entity)
        {
            _db.Sneakers.Remove(entity);

            if (await _db.SaveChangesAsync() == 0)
            {
                return false;
            }

            return true;
        }

        public async Task<Sneaker> Get(int id)
        {
            return await _db.Sneakers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Sneaker>> GetAll()
        {
            return await _db.Sneakers.ToListAsync();
        }

        public async Task<bool> Update(Sneaker oldEntity, Sneaker newEntity)
        {
            oldEntity.Name = newEntity.Name;
            oldEntity.Photo = newEntity.Photo;
            oldEntity.Cost = newEntity.Cost;
            oldEntity.Count = newEntity.Count;

            if (await _db.SaveChangesAsync() == 0)
            {
                return false;
            }

            return true;
        }
    }
}
