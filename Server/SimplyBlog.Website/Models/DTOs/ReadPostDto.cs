using System.Collections.Generic;
using SimplyBlog.Core.Concrete;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Models.DTOs
{
    public class ReadPostDto : ReadShortPostDto
    {
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public static explicit operator ReadPostDto(Post post)
        {
            ReadPostDto result = new ReadPostDto()
            {
                Categories = post.Categories,
                Content = post.Content,
                Created = post.Created,
                Id = post.Id,
                LastModified = post.LastModified,
                Title = post.Title,
                Comments = post.Comments
            };

            result.ImageUri = ImageHandler.GetImageUri(post.ImageGuid);

            return result;
        }
    }
}
