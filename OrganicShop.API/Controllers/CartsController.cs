using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrganicShop.API.Data;
using OrganicShop.API.Dtos;
using OrganicShop.API.Models;

namespace OrganicShop.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public CartsController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("getCartById/{id}", Name = "GetCartById")]
        public async Task<IActionResult> GetCartById(string id)
        {
            var cartFromRepo = await _unitOfWork.Carts.GetCartById(id);

            var cartToReturn = _mapper.Map<CartForReturnDto>(cartFromRepo);

            return Ok(cartToReturn);
        }

        [HttpPost("createNewCart")]
        public async Task<IActionResult> CreateNewCart([FromBody]CartForCreationDto cartForCreationDto)
        {
            if (cartForCreationDto.UserId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var cart = _mapper.Map<Cart>(cartForCreationDto);
            
            _unitOfWork.Carts.Add(cart);

            if (await _unitOfWork.Carts.SaveAll())
            {
                var productId = cartForCreationDto.ProductId;

                CartItem item = new CartItem();
                item.CartId = cart.Id;
                item.ProductId = productId;
                item.Qty = 1;

                _unitOfWork.CartItems.Add(item);

                if (await _unitOfWork.CartItems.SaveAll())
                {
                    var cartToReturn = _mapper.Map<CartForReturnDto>(cart);
                    return CreatedAtRoute("getCartById", new {id = cart.Id}, cartToReturn);
                }

                throw new Exception($"Creating items for shopping cart {cart.Id} failed on save.");
            }

            throw new Exception("Creating shopping cart failed on save.");            
        }        

        [HttpDelete("{userId}/delete/{cartId}")]
        public async Task<IActionResult> DeleteCart(string userId, string cartId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var cartFromRepo = await _unitOfWork.Carts.GetCartById(cartId);

            if (cartFromRepo == null)
                return BadRequest("Cannot find the shopping cart to delete.");

            // Find products linked to this cart
            bool foundAndDeleted = false;
            var itemsFromRepo = await _unitOfWork.CartItems.GetItemsByCartId(cartId);
            if (itemsFromRepo != null && itemsFromRepo.Count > 0)
            {
                // If found, delete them first
                _unitOfWork.CartItems.RemoveRange(itemsFromRepo);
                if (await _unitOfWork.CartItems.SaveAll())
                    foundAndDeleted = true;
            }
            else
            {
                foundAndDeleted = true;
            }

            if (foundAndDeleted)
            {
                _unitOfWork.Carts.Remove(cartFromRepo);

                if (await _unitOfWork.Carts.SaveAll())
                    return Ok();
            }

            return BadRequest("Failed to delete the shopping cart.");
        }

        [HttpPut("{userId}/updateItem/{cartId}")]
        public async Task<IActionResult> UpdateCartItem(string userId, string cartId, CartItemForUpdateDto itemForUpdateDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var cartFromRepo = await _unitOfWork.Carts.GetCartById(cartId);
            if (cartFromRepo == null)
                return BadRequest("Cannot find the shopping cart to update.");

            var itemFromRepo = await _unitOfWork.CartItems.GetItemsByCartIdAndProductId(cartId, itemForUpdateDto.ProductId);
            if (itemFromRepo == null)
            {
                // Cannot find the Item to update
                CartItem item = new CartItem();
                item.CartId = cartId;
                item.ProductId = itemForUpdateDto.ProductId;
                item.Qty = 1;

                _unitOfWork.CartItems.Add(item);                
            }
            else
            {
                if (itemForUpdateDto.Action == "plus")
                {
                    itemFromRepo.Qty = itemFromRepo.Qty + 1;
                }
                else
                {
                    if (itemFromRepo.Qty <= 1)
                    {
                        _unitOfWork.CartItems.Remove(itemFromRepo);
                    }
                    else
                    {
                        itemFromRepo.Qty = itemFromRepo.Qty - 1;
                    }
                }
            }            
            
            if (await _unitOfWork.CartItems.SaveAll())
                return NoContent();

            throw new Exception($"Updating Item in shopping cart {cartId} failed on save.");
        }

        [HttpGet("getItemsByCart/{cartId}", Name = "GetItemsByCart")]
        public async Task<IActionResult> GetItemsByCart(string cartId)
        {
            var itemsFromRepo = await _unitOfWork.CartItems.GetItemsByCartId(cartId);            

            return Ok(itemsFromRepo);
        }

    }
}