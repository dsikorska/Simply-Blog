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

        public IEnumerable<Comment> GetAllComments(long id)
        {
            return Enumerable.Empty<Comment>();
        }

        public Post GetById(long id)
        {
            return new Post();
        }

        public int GetMaxPages(string category)
        {
            return 0;
        }

        public IEnumerable<Post> GetPosts(int page, string category)
        {
            return Enumerable.Empty<Post>();
        }

        public IEnumerable<string> GetTags()
        {
            return Enumerable.Empty<string>();
        }

        public void Update(Post entity)
        {

        }
    }
}
