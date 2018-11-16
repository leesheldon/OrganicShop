using System.Threading.Tasks;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface IOrderRepository : IRepository<Order>
    {
         Task<PagedList<Order>> GetAllOrdersByUser(OrderParams orderParams);

         Task<Order> GetOrderById(string id);

    }
}