using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace OrganicShop.API.Models
{
    public class User : IdentityUser<string>
    {
        public string Gender { get; set; }

        public string KnownAs { get; set; }

        public DateTime DateOfBirth { get; set; }        

        public DateTime CreatedOn { get; set; }

        public DateTime LastActive { get; set; }
        
        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
        

    }
}