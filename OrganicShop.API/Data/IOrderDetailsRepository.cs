using System.Collections.Generic;
using System.Threading.Tasks;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface IOrderDetailsRepository : IRepository<OrderDetails>
    {
        Task<PagedList<OrderDetails>> GetOrderDetailsByOrderId(OrderDetailsParams orderDetailsParams);
        Task<OrderDetails> GetDetailsByOrderIdAndProductId(string orderId, string productId);

    }
}