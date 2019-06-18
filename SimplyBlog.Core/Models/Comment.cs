using System;
using System.Collections.Generic;

namespace SimplyBlog.Core.Models
{
    public class Comment : Entity<int>
    {
        public int PostId { get; set; }
        public string Author { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public List<Comment> Replies { get; set; }
    }
}
