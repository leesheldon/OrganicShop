using System.Threading.Tasks;

namespace OrganicShop.API.Data
{
    public interface IOshopRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();

    }
}