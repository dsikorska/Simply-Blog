using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;

        public BlogController(IBlogRepository repository)
        {
            blogRepository = repository;
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<Post>> GetAllPosts()
        {
            return Ok(blogRepository.GetAll());
        }

        [HttpGet("{id:int}")]
        public ActionResult<Post> GetPost(int id)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                return Ok(post);
            }

            return NotFound();
        }

        [HttpGet("comments")]
        public ActionResult<IEnumerable<Comment>> GetAllPostComments(int id)
        {
            return Ok(blogRepository.GetAllComments(id));
        }

        [HttpPost("new")]
        public ActionResult CreatePost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            blogRepository.Create(post);
            return Ok();
        }

        [HttpPatch("{id:int}")]
        public ActionResult EditPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post p = blogRepository.GetById(post.Id);

            if (p != null)
            {
                p.Categories = post.Categories;
                p.Content = post.Content;
                p.Title = post.Title;
                p.LastModified = DateTime.UtcNow;

                blogRepository.Update(p);

                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id:int}")]
        public ActionResult DeletePost(int id)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                blogRepository.Delete(post);
                return Ok();
            }

            return NotFound();
        }

        [HttpPost("{id:int}/new")]
        public ActionResult CreateComment(int id, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(comment);
            }

            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                blogRepository.AddComment(post, comment);
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{postId:int}/{id:int}")]
        public ActionResult DeleteComment(int postId, int id)
        {
            Post post = blogRepository.GetById(postId);
            Comment comment = post.Comments.Select(x => x).FirstOrDefault(x => x.Id == id);

            if (post != null && comment != null)
            {
                blogRepository.DeleteComment(post, comment);
                return Ok();
            }

            return NotFound();
        }
    }
}