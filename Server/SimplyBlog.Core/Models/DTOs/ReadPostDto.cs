using System;
using System.Collections.Generic;

namespace SimplyBlog.Core.Models.DTOs
{
    public class ReadPostDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string ImageUri { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
