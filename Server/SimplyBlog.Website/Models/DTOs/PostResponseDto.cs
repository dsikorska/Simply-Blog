using System.Collections.Generic;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Models.DTOs
{
    public class PostResponseDto : ShortPostResponseDto
    {
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public static explicit operator PostResponseDto(Post post)
        {
            PostResponseDto result = new PostResponseDto()
            {
                Categories = post.Categories,
                Content = post.Content,
                Created = post.Created,
                Id = post.Id,
                LastModified = post.LastModified,
                Title = post.Title,
                Comments = post.Comments
            };

            return result;
        }
    }
}
