using OrganicShop.API.Models;

namespace OrganicShop.API.Dtos
{
    public class OrderDetailsForCreationDto
    {
        public string Id { get; set; }    

        public string OrderId { get; set; }        

        public string ProductId { get; set; }    

        public Order Order { get; set; }
        
        public Product Product { get; set; }

        public double Qty { get; set; }
        
    }
}