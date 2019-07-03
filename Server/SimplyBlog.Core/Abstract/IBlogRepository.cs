using System.Collections.Generic;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Core.Abstract
{
    public interface IBlogRepository : IRepository<Post>
    {
        IEnumerable<Comment> GetAllComments(int id);
        void AddComment(Post post, Comment comment);
        void DeleteComment(Post post, Comment comment);
    }
}
