using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public ProductRepository(DataContext context) : base(context)
        {
            
        }
        
    }
}