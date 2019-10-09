using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Models.DTOs
{
    public class EditPostDto
    {
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        public IFormFile Image { get; set; }
        public bool UseExistingImage { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
