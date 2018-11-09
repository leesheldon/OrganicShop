using System;
using System.Collections.Generic;

namespace OrganicShop.API.Models
{
    public class Product
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public double Price { get; set; }

        public string PhotoUrl { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }
        
        public bool InActive { get; set; }

        public Category Category { get; set; }

        public string CategoryId { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
        
    }
}