using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Core.Concrete;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly Repository<Post> postRepository;

        public PostController()
        {
            string path = Environment.CurrentDirectory;
            postRepository = new Repository<Post>(new XmlContext(path));
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<Post>> GetAll()
        {
            return Ok(postRepository.GetAll());
        }

        [HttpGet("{id:int}")]
        public ActionResult<Post> Get(int id)
        {
            Post post = postRepository.GetById(id);

            if (post != null)
            {
                return Ok(post);
            }

            return NotFound();
        }

        [HttpPost("new")]
        public ActionResult Create(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            postRepository.Create(post);
            return Ok();
        }

        [HttpPatch("{id:int}")]
        public ActionResult Edit(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post p = postRepository.GetById(post.Id);

            if (p != null)
            {
                p.Categories = post.Categories;
                p.Content = post.Content;
                p.Title = post.Title;
                p.LastModified = DateTime.UtcNow;

                postRepository.Update(p);

                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            Post post = postRepository.GetById(id);

            if (post != null)
            {
                postRepository.Delete(post);
                return Ok();
            }

            return NotFound();
        }
    }
}