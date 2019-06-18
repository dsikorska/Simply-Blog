using System.Collections.Generic;
using System.Linq;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Tests
{
    public class FakeBlogRepository : IBlogRepository
    {
        public void AddComment(Post post, Comment comment)
        {

        }

        public void Create(Post entity)
        {

        }

        public void Delete(Post entity)
        {

        }

        public void DeleteComment(Post post, Comment comment)
        {

        }

        public IEnumerable<Post> GetAll()
        {
            return Enumerable.Empty<Post>();
        }

        public IEnumerable<Comment> GetAllComments(int id)
        {
            return Enumerable.Empty<Comment>();
        }

        public Post GetById(int id)
        {
            return new Post();
        }

        public void Update(Post entity)
        {

        }
    }
}
