using System.Threading.Tasks;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface ICartRepository : IRepository<Cart>
    {
         Task<Cart> GetCartById(string id);

    }
}