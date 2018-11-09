using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using OrganicShop.API.Models;

namespace OrganicShop.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _context;

        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
        }

        public void SeedUser()
        {
            if (!_userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role {Name = "Customer"},
                    new Role {Name = "Admin"},
                    new Role {Name = "OrderManager"},
                    new Role {Name = "ProductManager"},
                    new Role {Name = "Staff"},
                    new Role {Name = "VIP"}
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    IdentityResult resultUser = _userManager.CreateAsync(user, "password").Result;
                    if (resultUser.Succeeded)
                    {
                        var normalUser = _userManager.FindByNameAsync(user.UserName).Result;
                        _userManager.AddToRoleAsync(normalUser, "Customer").Wait();
                    }
                }

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult resultAdmin = _userManager.CreateAsync(adminUser, "password").Result;

                if (resultAdmin.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync(adminUser.UserName).Result;
                    _userManager.AddToRolesAsync(admin, new[] {"Admin", "OrderManager", "ProductManager" }).Wait();
                }
            }
        }

        public void SeedCategories()
        {
            var categoriesData = System.IO.File.ReadAllText("Data/CategoriesSeedData.json");
            var categories = JsonConvert.DeserializeObject<List<Category>>(categoriesData);

            foreach (var category in categories)
            {
                _context.Categories.Add(category);
            }

            _context.SaveChanges();
        }

        public void SeedProducts()
        {
            var productsData = System.IO.File.ReadAllText("Data/ProductsSeedData.json");
            var products = JsonConvert.DeserializeObject<List<Product>>(productsData);

            foreach (var product in products)
            {
                _context.Products.Add(product);
            }

            _context.SaveChanges();
        }
        
    }
}