using System.Collections.Generic;

namespace OrganicShop.API.Models
{
    public class Category
    {
        public string Id { get; set; }

        public string CategoryName { get; set; }

        public ICollection<Product> Products { get; set; }
        
    }
}