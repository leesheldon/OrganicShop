using System;

namespace OrganicShop.API.Dtos
{
    public class CartForReturnDto
    {
        public string Id { get; set; }

        public string UserId { get; set; }
        
        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }
        
    }
}