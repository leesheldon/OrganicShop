using System.Collections.Generic;
using System.Threading.Tasks;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface ICartItemRepository : IRepository<CartItem>
    {
        Task<PagedList<CartItem>> GetCartItemsWithPaging(CartItemParams cartItemParams);
        Task<List<CartItem>> GetItemsByCartId(string cartId);
        Task<CartItem> GetItemsByCartIdAndProductId(string cartId, string productId);

    }
}