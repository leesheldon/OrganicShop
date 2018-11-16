using AutoMapper;
using OrganicShop.API.Dtos;
using OrganicShop.API.Models;

namespace OrganicShop.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            
            CreateMap<UserForRegisterDto, User>();
            CreateMap<ProductForCreationDto, Product>().ReverseMap();
            CreateMap<Product, ProductForReturnDto>();
            CreateMap<ProductForUpdateDto, Product>();
            CreateMap<Category, CategoryForReturnDto>();
            CreateMap<CategoryForSavingDto, Category>();
            CreateMap<CartForCreationDto, Cart>();
            CreateMap<CartForUpdateDto, Cart>();
            CreateMap<Cart, CartForReturnDto>();            
            CreateMap<OrderForCreationDto, Order>();
            
        }

    }
}