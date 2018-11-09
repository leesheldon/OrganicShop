using System;

namespace OrganicShop.API.Dtos
{
    public class ProductForReturnDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public double Price { get; set; }

        public string PhotoUrl { get; set; }

        public CategoryForReturnDto Category { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }
        
    }
}