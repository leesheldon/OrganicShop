using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public OrderRepository(DataContext context) : base(context)
        {
            
        }        

        public async Task<Order> GetOrderById(string id)
        {
            var order = await oContext.Orders
                .Include(p => p.OrderDetails)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            return order;
        }

        public async Task<PagedList<Order>> GetAllOrdersByUser(OrderParams orderParams)
        {
            var orders = oContext.Orders
                .Include(p => p.OrderDetails)
                .Where(p =>p.UserId == orderParams.UserId)
                .OrderByDescending(p => p.OrderDate)
                .AsQueryable();
            
            return await PagedList<Order>.CreateAsync(orders, orderParams.PageNumber, orderParams.PageSize);
        }
    }
}