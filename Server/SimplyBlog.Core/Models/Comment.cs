using System;
using System.ComponentModel.DataAnnotations;

namespace SimplyBlog.Core.Models
{
    public class Comment : Entity<int>
    {
        public int PostId { get; set; }

        [Required]
        public string Author { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}
