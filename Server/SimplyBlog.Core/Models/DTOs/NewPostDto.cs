using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Models.DTOs
{
    public class NewPostDto
    {
        [Required]
        public string Title { get; set; }

        public IFormFile Image { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
    }
}
