using System;
using System.Collections.Generic;
using OrganicShop.API.Models;

namespace OrganicShop.API.Dtos
{
    public class OrderForCreationDto
    {
        public string UserId { get; set; }

        public double OrderTotal { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime DateOfReceiving { get; set; }

        public string AddressLine1 { get; set; }

        public string AddressLine2 { get; set; }

        public string Comments { get; set; }

        public string Status { get; set; }

        public ICollection<OrderDetailsForCreationDto> OrderDetails { get; set; }

        public OrderForCreationDto()
        {
            OrderDate = DateTime.Now;
        }

    }
}