using System;
using System.Collections.Generic;
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
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductsController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("getAllProducts")]
        public async Task<IActionResult> GetAllProducts([FromQuery]ProductParams productParams)
        {
            var productsFromRepo = await _unitOfWork.Products.GetAllProducts(productParams);

            var productToReturn = _mapper.Map<IEnumerable<ProductForReturnDto>>(productsFromRepo);

            Response.AddPagination(
                productsFromRepo.CurrentPage, 
                productsFromRepo.PageSize, 
                productsFromRepo.TotalCount, 
                productsFromRepo.TotalPages);

            return Ok(productToReturn);
        }

        [HttpGet("admin/getAllProducts")]
        public async Task<IActionResult> GetAllProducts_Admin([FromQuery]ProductParams productParams)
        {
            var productsFromRepo = await _unitOfWork.Products.GetAllProducts_Admin(productParams);

            var productToReturn = _mapper.Map<IEnumerable<ProductForReturnDto>>(productsFromRepo);
            
            return Ok(productToReturn);
        }

        [HttpGet("getProductsByCategory/{categoryId}", Name = "GetProductsByCategory")]
        public async Task<IActionResult> GetProductsByCategory(string categoryId)
        {
            var productsFromRepo = await _unitOfWork.Products.GetProductsByCategoryId(categoryId);

            var productToReturn = _mapper.Map<IEnumerable<ProductForReturnDto>>(productsFromRepo);

            return Ok(productToReturn);
        }

        [HttpGet("getProductById/{id}", Name = "GetProductById")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var productFromRepo = await _unitOfWork.Products.GetProductById(id);

            var productToReturn = _mapper.Map<ProductForReturnDto>(productFromRepo);

            return Ok(productToReturn);
        }

        [HttpGet("getProductsByName/{name}", Name = "GetProductsByName")]
        public async Task<IActionResult> GetProductsByName(string name)
        {
            var productsFromRepo = await _unitOfWork.Products.GetProductsByName(name);

            var productToReturn = _mapper.Map<IEnumerable<ProductForReturnDto>>(productsFromRepo);

            return Ok(productToReturn);
        }

        [HttpPost("createNewProduct/{userId}")]
        public async Task<IActionResult> CreateNewProduct(string userId, [FromBody]ProductForCreationDto productForCreationDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var product = _mapper.Map<Product>(productForCreationDto);

            _unitOfWork.Products.Add(product);

            if (await _unitOfWork.Products.SaveAll())
            {
                CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
            }

            throw new Exception("Creating product failed on save.");            
        }

        [HttpPut("{userId}/update/{productId}")]
        public async Task<IActionResult> UpdateProduct(string userId, string productId, ProductForUpdateDto productForUpdateDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var productFromRepo = await _unitOfWork.Products.GetProductById(productId);
            if (productFromRepo == null)
                return BadRequest("Cannot find the product to update.");

            _mapper.Map(productForUpdateDto, productFromRepo);

            if (await _unitOfWork.Products.SaveAll())
                return NoContent();

            throw new Exception($"Updating product {productId} failed on save.");
        }

        [HttpDelete("{userId}/delete/{productId}")]
        public async Task<IActionResult> DeleteProduct(string userId, string productId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var productFromRepo = await _unitOfWork.Products.GetProductById(productId);
            if (productFromRepo == null)
                return BadRequest("Cannot find the product to delete.");

             _unitOfWork.Products.Remove(productFromRepo);

            if (await _unitOfWork.Products.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the product.");
        }
        

    }
}