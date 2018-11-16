using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public CartRepository(DataContext context) : base(context)
        {
            
        }

        public async Task<Cart> GetCartById(string id)
        {
            var cart = await oContext.Carts
                        .FirstOrDefaultAsync(p => p.Id == id);

            return cart;
        }

    }
}