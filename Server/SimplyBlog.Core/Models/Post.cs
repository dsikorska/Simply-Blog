using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimplyBlog.Core.Models
{
    public class Post : Entity<Guid>
    {
        [Required]
        public string Title { get; set; }

        public Guid? ImageGuid { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
