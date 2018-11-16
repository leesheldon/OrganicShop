using System;

namespace OrganicShop.API.Data
{
    public class UnitOfWork : IDisposable
    {
        private readonly DataContext _context;

        public IProductRepository Products { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public ICartRepository Carts { get; private set; }
        public ICartItemRepository CartItems { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public IOrderDetailsRepository OrderDetails { get; private set; }

        public UnitOfWork(DataContext context)
        {
            _context = context;
            Products = new ProductRepository(_context);
            Categories = new CategoryRepository(_context);
            Carts = new CartRepository(_context);
            CartItems = new CartItemRepository(_context);
            Orders = new OrderRepository(_context);
            OrderDetails = new OrderDetailsRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
        
    }
}