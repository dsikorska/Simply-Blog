using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Models
{
    public class Post : Entity<Guid>
    {
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [XmlIgnore]
        public IFormFile Image { get; set; }

        public Guid? ImageGuid { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
