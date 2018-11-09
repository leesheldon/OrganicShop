using System;

namespace OrganicShop.API.Data
{
    public class UnitOfWork : IDisposable
    {
        private readonly DataContext _context;

        public IProductRepository Products { get; private set; }
        public ICategoryRepository Cateroies { get; private set; }

        public UnitOfWork(DataContext context)
        {
            _context = context;
            Products = new ProductRepository(_context);
            Cateroies = new CategoryRepository(_context);
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