using System.Collections.Generic;
using System.Threading.Tasks;

namespace ishop.DAL.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task<bool> Create(T entity);

        Task<bool> Delete(T entity);

        Task<bool> Update(T oldEntity, T newEntity);

        Task<IEnumerable<T>> GetAll();

        Task<T> Get(int id);
    }
}
