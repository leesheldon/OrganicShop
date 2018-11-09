using System;

namespace OrganicShop.API.Dtos
{
    public class ProductForCreationDto
    {
        public string Title { get; set; }

        public double Price { get; set; }

        public string PhotoUrl { get; set; }        

        public string CategoryId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime LastUpdated { get; set; }

        public bool InActive { get; set; }
        
        public ProductForCreationDto()
        {
            DateCreated = DateTime.Now;
            LastUpdated = DateTime.Now;
            InActive = false;
        }
        
    }
}