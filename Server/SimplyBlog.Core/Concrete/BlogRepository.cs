using System;
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

        public override void Create(Post entity)
        {
            entity.Id = Guid.NewGuid();
            base.Create(entity);
        }

        public IEnumerable<Post> GetPosts(int page)
        {
            return Entities.Skip(5 * page).Take(5);
        }

        public IEnumerable<Comment> GetAllComments(Guid id)
        {
            return Entities.SelectMany(x => x.Comments).Where(x => x.PostId == id);
        }

        public void AddComment(Post post, Comment comment)
        {
            comment.PostId = post.Id;
            comment.Id = Guid.NewGuid();
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
