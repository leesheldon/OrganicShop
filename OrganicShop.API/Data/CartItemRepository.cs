using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class CartItemRepository : Repository<CartItem>, ICartItemRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public CartItemRepository(DataContext context) : base(context)
        {
            
        }

        public async Task<PagedList<CartItem>> GetCartItemsWithPaging(CartItemParams cartItemParams)
        {
            var cartItems = oContext.CartItems
                    .Include(p => p.Cart)
                    .Include(p=>p.Product)
                    .OrderBy(p => p.Cart.LastUpdated)
                    .AsQueryable();
            
            return await PagedList<CartItem>.CreateAsync(cartItems, cartItemParams.PageNumber, cartItemParams.PageSize);
        }

        public async Task<List<CartItem>> GetItemsByCartId(string cartId)
        {
            var items = await oContext.CartItems
                .Include(p => p.Cart)
                .Include(p => p.Product)
                .Where(p => p.CartId == cartId)
                .ToListAsync();

            return items;
        }

        public async Task<CartItem> GetItemsByCartIdAndProductId(string cartId, string productId)
        {
            var item = await oContext.CartItems
                .Include(p => p.Cart)
                .Include(p => p.Product)
                .Where(p => p.CartId == cartId && p.ProductId == productId)
                .FirstOrDefaultAsync();

            return item;
        }
    }
}