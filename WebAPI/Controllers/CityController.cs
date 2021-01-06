using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Dtos;
using System;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private IMapper mapper;
        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            throw new UnauthorizedAccessException();
            var cities = await uow.CityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEquatable<CityDto>>(cities);
            return Ok(citiesDto);
        }

        // Post api/city/post --Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPost("updateDto/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityUpdateDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityUpdateDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if(id != cityDto.Id){
                return BadRequest("Update not allowed");
            }
            var cityFromDb = await uow.CityRepository.FindCity(id);
            if(cityFromDb == null) {
                return BadRequest("Update not allowed");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }  
    }
}

