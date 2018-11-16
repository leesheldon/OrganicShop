using System;
using System.Collections.Generic;

namespace OrganicShop.API.Models
{
    public class Order
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public double OrderTotal { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime DeliveredDate { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string Comments { get; set; }

        public string Status { get; set; }

        public ICollection<OrderDetails> OrderDetails { get; set; }

    }
}