using System;
using System.ComponentModel.DataAnnotations;

namespace SimplyBlog.Core.Models
{
    public class Comment : Entity<Guid>
    {
        public long PostId { get; set; }

        public string Author { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}
