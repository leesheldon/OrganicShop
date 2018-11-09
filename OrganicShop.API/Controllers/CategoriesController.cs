using System;
using System.Collections.Generic;
using System.Net;
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
    public class CategoriesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UnitOfWork _unitOfWork;

        public CategoriesController(UnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("getCategoryById/{id}", Name = "GetCategoryById")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var categoryFromRepo = await _unitOfWork.Categories.GetCategoryById(id);

            var categoryToReturn = _mapper.Map<CategoryForReturnDto>(categoryFromRepo);

            return Ok(categoryToReturn);
        }

        [HttpGet("GetCategoriesNoPaging")]
        public async Task<IActionResult> GetCategoriesNoPaging()
        {
            var categoriesFromRepo = await _unitOfWork.Categories.GetCategoriesNoPaging();

            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryForReturnDto>>(categoriesFromRepo);

            return Ok(categoriesToReturn);
        }

        [HttpGet("GetCategoriesWithPaging")]
        public async Task<IActionResult> GetCategoriesWithPaging([FromQuery]CategoryParams categoryParams)
        {
            var categoriesFromRepo = await _unitOfWork.Categories.GetCategoriesWithPaging(categoryParams);

            var categoriesToReturn = _mapper.Map<IEnumerable<CategoryForReturnDto>>(categoriesFromRepo);

            Response.AddPagination(
                categoriesFromRepo.CurrentPage,
                categoriesFromRepo.PageSize,
                categoriesFromRepo.TotalCount,
                categoriesFromRepo.TotalPages);

            return Ok(categoriesToReturn);
        }
        
        [HttpPost("createNewCategory/{userId}")]
        public async Task<IActionResult> CreateNewCategory(string userId, [FromBody]CategoryForSavingDto categoryForSavingDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var category = _mapper.Map<Category>(categoryForSavingDto);

            _unitOfWork.Categories.Add(category);

            if (await _unitOfWork.Categories.SaveAll())
            {
                return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
            }

            throw new Exception("Creating category failed on save.");
        }

        [HttpPut("{userId}/update/{categoryId}")]
        public async Task<IActionResult> UpdateCategory(string userId, string categoryId, CategoryForSavingDto categoryForSavingDto)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var categoryFromRepo = await _unitOfWork.Categories.GetCategoryById(categoryId);
            if (categoryFromRepo == null)
                return BadRequest("Cannot find the category to update.");

            _mapper.Map(categoryForSavingDto, categoryFromRepo);

            if (await _unitOfWork.Categories.SaveAll())
                return NoContent();

            throw new Exception($"Updating category {categoryId} failed on save.");
        }

        [HttpDelete("{userId}/delete/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(string userId, string categoryId)
        {
            if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                return Unauthorized();

            var categoryFromRepo = await _unitOfWork.Categories.GetCategoryById(categoryId);

            if (categoryFromRepo == null)
                return BadRequest("Cannot find the category to delete.");

            // Find products linked to this category
            bool foundAndDeleted = false;
            var productsFromRepo = await _unitOfWork.Products.GetProductsByCategoryId(categoryId);
            if (productsFromRepo != null && productsFromRepo.Count > 0)
            {
                // If found, delete them first
                _unitOfWork.Products.RemoveRange(productsFromRepo);
                if (await _unitOfWork.Products.SaveAll())
                    foundAndDeleted = true;
            }
            else
            {
                foundAndDeleted = true;
            }

            if (foundAndDeleted)
            {
                _unitOfWork.Categories.Remove(categoryFromRepo);

                if (await _unitOfWork.Categories.SaveAll())
                    return Ok();
            }

            return BadRequest("Failed to delete the category.");
        }

    }
}