using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class OrderDetailsRepository : Repository<OrderDetails>, IOrderDetailsRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public OrderDetailsRepository(DataContext context) : base(context)
        {
            
        }

        public async Task<OrderDetails> GetDetailsByOrderIdAndProductId(string orderId, string productId)
        {
            var orderDetail = await oContext.OrderDetails
                .Include(p => p.Order)
                .Include(p => p.Product)
                .Where(p => p.OrderId == orderId && p.ProductId == productId)
                .FirstOrDefaultAsync();

            return orderDetail;
        }

        public async Task<PagedList<OrderDetails>> GetOrderDetailsByOrderId(OrderDetailsParams orderDetailsParams)
        {
            var orderDetails = oContext.OrderDetails
                .Include(p => p.Order)
                .Include(p => p.Product)
                .Where(p =>p.OrderId == orderDetailsParams.OrderId)                
                .AsQueryable();
            
            return await PagedList<OrderDetails>.CreateAsync(orderDetails, orderDetailsParams.PageNumber, orderDetailsParams.PageSize);
        }
        
    }
}