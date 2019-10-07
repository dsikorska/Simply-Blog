using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Concrete;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Models.DTOs;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;
        private readonly IMapper mapper;

        public BlogController(IBlogRepository repository, IMapper map)
        {
            blogRepository = repository;
            mapper = map;
        }

        [HttpGet("posts/{page:int?}")]
        public ActionResult<IEnumerable<Post>> GetPosts(int page = 0)
        {
            IEnumerable<Post> posts = blogRepository.GetPosts(page);
            IEnumerable<ReadShortPostDto> mappedPosts = posts.Select(x => (ReadShortPostDto)x);
            return Ok(mappedPosts);
        }

        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(long id, [FromQuery]bool shortPost = false)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                if (shortPost)
                {
                    return Ok((ReadShortPostDto)post);
                }
                else
                {
                    return Ok((ReadPostDto)post);
                }
            }

            return NotFound();
        }

        [HttpGet("comments/{id}")]
        public ActionResult<IEnumerable<Comment>> GetAllPostComments(long id)
        {
            return Ok(blogRepository.GetAllComments(id));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("new")]
        public async Task<ActionResult> CreatePost([FromForm]NewPostDto post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post newPost = mapper.Map<Post>(post);
            newPost.ImageGuid = await ImageHandler.SaveImageToFile(post.Image);
            blogRepository.Create(newPost);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPatch("{id}")]
        public async Task<ActionResult> EditPost([FromForm]EditPostDto post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post p = blogRepository.GetById(post.Id);

            if (p != null)
            {
                p.ImageGuid = await ImageHandler.SaveImageToFile(post.Image);
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
        public ActionResult DeletePost(long id)
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
        public ActionResult CreateComment(long id, Comment comment)
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
        public ActionResult DeleteComment(long postId, Guid id)
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