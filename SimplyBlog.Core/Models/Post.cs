using System;
using System.Collections.Generic;

namespace SimplyBlog.Core.Models
{
    public class Post : Entity<int>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastModified { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<Comment> Comments { get; set; }
    }
}
