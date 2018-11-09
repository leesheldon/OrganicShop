using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public DataContext oContext
        {
            get { return _context as DataContext; }
        }

        public CategoryRepository(DataContext context) : base(context)
        {            
        }

        public async Task<IEnumerable<Category>> GetCategoriesNoPaging()
        {
            var categories = await oContext.Categories
                .OrderBy(p => p.CategoryName)
                .ToListAsync();

            return categories;
        }

        public async Task<PagedList<Category>> GetCategoriesWithPaging(CategoryParams categoryParams)
        {
            var categories = oContext.Categories
                .OrderBy(p => p.CategoryName)
                .AsQueryable();

            // Name
            if (!string.IsNullOrEmpty(categoryParams.CategoryName))
            {
                categories = categories.Where(p => p.CategoryName.ToLower().Contains(categoryParams.CategoryName.ToLower()));
            }

            return await PagedList<Category>.CreateAsync(categories, categoryParams.PageNumber, categoryParams.PageSize);
        }

        public async Task<Category> GetCategoryById(string id)
        {
            var category = await oContext.Categories
                        .FirstOrDefaultAsync(p => p.Id == id);

            return category;
        }

    }
}