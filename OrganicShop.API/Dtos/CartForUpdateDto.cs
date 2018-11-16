using System;
using System.Collections.Generic;
using OrganicShop.API.Models;

namespace OrganicShop.API.Dtos
{
    public class CartForUpdateDto
    {
        public DateTime LastUpdated { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
        
        public CartForUpdateDto()
        {
            LastUpdated = DateTime.Now;
        }
        
    }
}