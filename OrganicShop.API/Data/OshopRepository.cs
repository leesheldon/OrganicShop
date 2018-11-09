using System.Threading.Tasks;

namespace OrganicShop.API.Data
{
    public class OshopRepository : IOshopRepository
    {
        private readonly DataContext _context;

        public OshopRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
    }
}