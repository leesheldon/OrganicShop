using System;

namespace OrganicShop.API.Dtos
{
    public class UserForDetailedDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
        
        public string Gender { get; set; }

        public int Age { get; set; }

        public string KnownAs { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastActive { get; set; }
        
        public string City { get; set; }

        public string Country { get; set; }
        
    }
}