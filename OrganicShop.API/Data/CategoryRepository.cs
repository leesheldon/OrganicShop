using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public CategoryRepository(DataContext context) : base(context)
        {
            
        }
        
    }
}