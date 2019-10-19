using System;
using System.Collections.Generic;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Models.DTOs
{
    public class ShortPostResponseDto : Response.Response
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string ImageUri { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastModified { get; set; } = DateTime.UtcNow;
        public List<string> Categories { get; set; } = new List<string>();

        public static explicit operator ShortPostResponseDto(Post post)
        {
            ShortPostResponseDto result = new ShortPostResponseDto()
            {
                Categories = post.Categories,
                Content = post.Content,
                Created = post.Created,
                Id = post.Id,
                LastModified = post.LastModified,
                Title = post.Title
            };

            return result;
        }
    }
}
