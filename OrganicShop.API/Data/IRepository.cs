using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrganicShop.API.Data
{
    public interface IRepository<T> where T : class
    {
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);        
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        Task<bool> SaveAll();
        
    }
}