using System;
using System.Collections.Generic;
using OrganicShop.API.Models;

namespace OrganicShop.API.Dtos
{
    public class CartForCreationDto
    {
        public string UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }

        public string ProductId { get; set; }

        public CartForCreationDto()
        {
            DateCreated = DateTime.Now;
            LastUpdated = DateTime.Now;
        }
        
    }
}