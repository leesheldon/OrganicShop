using System.Collections.Generic;
using System.Threading.Tasks;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedList<Product>> GetAllProducts(ProductParams productParams);
        Task<List<Product>> GetAllProducts_Admin(ProductParams productParams);
        Task<List<Product>> GetProductsByCategoryId(string categoryId);
        Task<Product> GetProductById(string id);
        Task<IEnumerable<Product>> GetProductsByName(string name);

    }
}