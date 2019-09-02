using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Models.DTOs
{
    public class EditPostDto
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public IFormFile Image { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
