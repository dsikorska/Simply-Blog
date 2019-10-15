using System.Collections.Generic;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Core.Abstract
{
    public interface IBlogRepository : IRepository<Post>
    {
        IEnumerable<Post> GetPosts(int page, string category);
        Post GetById(long id);
        IEnumerable<Comment> GetAllComments(long id);
        void AddComment(Post post, Comment comment);
        void DeleteComment(Post post, Comment comment);
    }
}
