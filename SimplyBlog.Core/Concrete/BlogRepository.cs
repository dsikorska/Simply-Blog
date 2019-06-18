using System.Collections.Generic;
using System.Linq;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Core.Concrete
{
    public class BlogRepository : Repository<Post>, IBlogRepository
    {
        public BlogRepository(XmlContext context) : base(context)
        {

        }

        public IEnumerable<Comment> GetAllComments(int id)
        {
            return Entities.SelectMany(x => x.Comments).Where(x => x.PostId == id);
        }

        public void AddComment(Post post, Comment comment)
        {
            comment.PostId = post.Id;
            post.Comments.Add(comment);
            Update(post);
        }

        public void DeleteComment(Post post, Comment comment)
        {
            post.Comments.Remove(comment);
            Update(post);
        }
    }
}
