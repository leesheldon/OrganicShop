namespace OrganicShop.API.Models
{
    public class OrderDetails
    {
        public string Id { get; set; }
        
        public string OrderId { get; set; }

        public Order Order { get; set; }

        public string ProductId { get; set; }

        public Product Product { get; set; }

        public double Qty { get; set; }

    }
}