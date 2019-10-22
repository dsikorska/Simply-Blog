using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Website.Models.DTOs
{
    public class AboutRequestDto
    {
        public string About { get; set; }
        public IFormFile Image { get; set; }
        public bool UseExistingImage { get; set; }
    }
}
