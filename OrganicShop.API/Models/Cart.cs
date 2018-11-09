using System;
using System.Collections.Generic;

namespace OrganicShop.API.Models
{
    public class Cart
    {
        public string Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }
        
        public ICollection<CartItem> CartItems { get; set; }
        
    }
}