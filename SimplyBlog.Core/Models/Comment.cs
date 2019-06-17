using System;
using System.Collections.Generic;

namespace SimplyBlog.Core.Models
{
    public class Comment : Entity<int>
    {
        public string Author { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public IEnumerable<Comment> Replies { get; set; }
    }
}
