using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrganicShop.API.Dtos;
using OrganicShop.API.Models;

namespace OrganicShop.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(
            IConfiguration config,
            IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _config = config;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // Login by User Name
            bool byName = true;
            var user = await _userManager.FindByNameAsync(userForLoginDto.LogInName);

            if (user == null)
            {
                // Login by email
                user = await _userManager.FindByEmailAsync(userForLoginDto.LogInName);
                byName = false;

                if (user == null)
                    return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                User appUser = null;

                if (byName)
                {
                    appUser = await _userManager.Users
                        .FirstOrDefaultAsync(p => p.NormalizedUserName == userForLoginDto.LogInName.ToUpper());
                }
                else
                {
                    appUser = await _userManager.Users
                        .FirstOrDefaultAsync(p => p.NormalizedEmail == userForLoginDto.LogInName.ToUpper());
                }

                if (appUser == null)
                    return Unauthorized();

                var userToReturn = _mapper.Map<UserForDetailedDto>(appUser);

                return Ok(new 
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
        }
        
        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenValue = _config.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}