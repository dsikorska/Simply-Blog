using System;
using System.Collections.Generic;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Core.Abstract
{
    public interface IBlogRepository : IRepository<Post>
    {
        IEnumerable<Post> GetPosts(int page);
        IEnumerable<Comment> GetAllComments(Guid id);
        void AddComment(Post post, Comment comment);
        void DeleteComment(Post post, Comment comment);
    }
}
