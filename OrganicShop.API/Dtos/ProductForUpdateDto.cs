using System;

namespace OrganicShop.API.Dtos
{
    public class ProductForUpdateDto
    {
        public string Title { get; set; }

        public double Price { get; set; }

        public string PhotoUrl { get; set; }        

        public string CategoryId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }

        public bool InActive { get; set; }
        
        public ProductForUpdateDto()
        {
            LastUpdated = DateTime.Now;
        }
        
    }
}