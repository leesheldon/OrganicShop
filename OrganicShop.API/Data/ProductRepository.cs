using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public ProductRepository(DataContext context) : base(context)
        {            
        }

        public async Task<PagedList<Product>> GetAllProducts(ProductParams productParams)
        {
            var products = oContext.Products
                .Include(p => p.Category)
                .OrderByDescending(p => p.DateCreated)
                .AsQueryable();

            // Title
            if (!string.IsNullOrEmpty(productParams.Title))
            {
                products = products.Where(p => p.Title.ToLower().Contains(productParams.Title.ToLower()));
            }

            // Category
            if (!string.IsNullOrEmpty(productParams.CategoryId))
            {
                products = products.Where(p => p.CategoryId == productParams.CategoryId);
            }

            // Price
            var minPrice = productParams.MinPrice;
            var maxPrice = productParams.MaxPrice;
            products = products.Where(x => x.Price >= minPrice && x.Price <= maxPrice);

            // Order By
            if (!string.IsNullOrEmpty(productParams.OrderBy))
            {
                switch(productParams.OrderBy)
                {
                    case "createdOn":
                            products = products.OrderByDescending(x => x.DateCreated);
                            break;
                    default:
                            products = products.OrderByDescending(x => x.LastUpdated);
                            break;
                }
            }

            return await PagedList<Product>.CreateAsync(products, productParams.PageNumber, productParams.PageSize);
        }

        public async Task<List<Product>> GetAllProducts_Admin(ProductParams productParams)
        {
            var products = oContext.Products
                .Include(p => p.Category)
                .OrderByDescending(p => p.DateCreated)
                .AsQueryable();

            // Title
            if (!string.IsNullOrEmpty(productParams.Title))
            {
                products = products.Where(p => p.Title.ToLower().Contains(productParams.Title.ToLower()));
            }

            // Category
            if (!string.IsNullOrEmpty(productParams.CategoryId))
            {
                products = products.Where(p => p.CategoryId == productParams.CategoryId);
            }

            // Price
            var minPrice = productParams.MinPrice;
            var maxPrice = productParams.MaxPrice;
            products = products.Where(x => x.Price >= minPrice && x.Price <= maxPrice);

            // Order By
            if (!string.IsNullOrEmpty(productParams.OrderBy))
            {
                switch(productParams.OrderBy)
                {
                    case "createdOn":
                            products = products.OrderByDescending(x => x.DateCreated);
                            break;
                    default:
                            products = products.OrderByDescending(x => x.LastUpdated);
                            break;
                }
            }        

            return await products.ToListAsync();
        }

        public async Task<List<Product>> GetProductsByCategoryId(string categoryId)
        {
            var products = await oContext.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();

            return products;
        }

        public async Task<Product> GetProductById(string id)
        {
            var product = await oContext.Products
                        .Include(p => p.Category)
                        .FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<IEnumerable<Product>> GetProductsByName(string name)
        {
            var products = await oContext.Products
                            .Include(p => p.Category)
                            .Where(p => p.Title.ToLower().Contains(name.ToLower()))
                            .ToListAsync();

            return products;
        }

    }
}