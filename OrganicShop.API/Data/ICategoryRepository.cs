using System.Collections.Generic;
using System.Threading.Tasks;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetCategoriesNoPaging();
        Task<PagedList<Category>> GetCategoriesWithPaging(CategoryParams categoryParams);
        Task<Category> GetCategoryById(string id);

    }
}