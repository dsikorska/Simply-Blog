using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Concrete;
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

        [HttpGet("posts/{page:int}")]
        public ActionResult<IEnumerable<Post>> GetPosts(int page)
        {
            return Ok(blogRepository.GetPosts(page));
        }

        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(Guid id)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                return Ok(post);
            }

            return NotFound();
        }

        [HttpGet("comments/{id}")]
        public ActionResult<IEnumerable<Comment>> GetAllPostComments(Guid id)
        {
            return Ok(blogRepository.GetAllComments(id));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("new")]
        public async Task<ActionResult> CreatePost([FromForm]Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            post.ImageGuid = await ImageHandler.SaveImageToFile(post.Image);
            blogRepository.Create(post);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPatch("{id}")]
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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public ActionResult DeletePost(Guid id)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                blogRepository.Delete(post);
                return Ok();
            }

            return NotFound();
        }

        [HttpPost("{id}/new")]
        public ActionResult CreateComment(Guid id, Comment comment)
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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{postId}/{id}")]
        public ActionResult DeleteComment(Guid postId, Guid id)
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