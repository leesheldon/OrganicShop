using System.ComponentModel.DataAnnotations;

namespace OrganicShop.API.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        public string LogInName { get; set; }

        [Required]
        public string Password { get; set; }
        
    }
}