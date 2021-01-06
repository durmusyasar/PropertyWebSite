using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage="Name is mandatory field")]
        [StringLength(50, MinimumLength=2)]
        [RegularExpression(".*[a-zA-z]+.*", ErrorMessage="Only Numerics are nor allowed")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }

    }
}