using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrganicShop.API.Data;
using OrganicShop.API.Dtos;
using OrganicShop.API.Helpers;
using OrganicShop.API.Models;

namespace OrganicShop.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;
        
        public OrdersController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("getAllOrdersByUser")]
        public async Task<IActionResult> GetAllOrdersByUser([FromQuery]OrderParams orderParams)
        {
            var ordersFromRepo = await _unitOfWork.Orders.GetAllOrdersByUser(orderParams);
             if (ordersFromRepo == null)
                return NotFound();
            
            Response.AddPagination(
                ordersFromRepo.CurrentPage, 
                ordersFromRepo.PageSize, 
                ordersFromRepo.TotalCount, 
                ordersFromRepo.TotalPages);

            return Ok(ordersFromRepo);
        }

        [HttpGet("getOrderById/{id}", Name = "GetOrderById")]
        public async Task<IActionResult> GetOrderById(string id)
        {
            var orderFromRepo = await _unitOfWork.Orders.GetOrderById(id);

            if (orderFromRepo == null)
                return NotFound();

            return Ok(orderFromRepo);
        }

        [HttpPost("createNewOrder/{userId}")]
        public async Task<IActionResult> CreateNewOrder(string userId, [FromBody]OrderForCreationDto orderForCreationDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            // Create Order
            var order = _mapper.Map<Order>(orderForCreationDto);

            order.Status = "Submitted";
            order.UserId = userId;
            order.DeliveredDate = orderForCreationDto.DateOfReceiving;

            _unitOfWork.Orders.Add(order);

            if (await _unitOfWork.Orders.SaveAll())
            {
                // Create Order details
                foreach(var detail in orderForCreationDto.OrderDetails)
                {                    
                    OrderDetails item = new OrderDetails();
                    item.OrderId = order.Id;
                    item.ProductId = detail.ProductId;
                    item.Qty = detail.Qty;
                    
                    _unitOfWork.OrderDetails.Add(item);
                }               
                
                if (await _unitOfWork.OrderDetails.SaveAll())
                {                    
                    return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
                }

                throw new Exception("Creating Order Details failed on save."); 
            }

            throw new Exception("Creating Order failed on save.");
        }

        [HttpDelete("{userId}/delete/{orderId}")]
        public async Task<IActionResult> DeleteOrder(string userId, string orderId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var orderFromRepo = await _unitOfWork.Orders.GetOrderById(orderId);
            if (orderFromRepo == null)
                return BadRequest("Cannot find the Order to delete.");

             _unitOfWork.Orders.Remove(orderFromRepo);

            if (await _unitOfWork.Orders.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the Order.");
        }

    }
}