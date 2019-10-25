using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Configuration;
using SimplyBlog.Website.Models.DTOs;
using SimplyBlog.Website.Models.Response;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;
        private readonly IMapper mapper;
        private readonly IWritableOptions<AboutWritableOption> about;
        private readonly IWritableOptions<HeaderWritableOption> header;
        private readonly ILogger<BlogController> logger;
        private readonly AppService service;

        public BlogController(
            AppService service,
            IBlogRepository repository,
            IMapper map,
            IWritableOptions<AboutWritableOption> about,
            IWritableOptions<HeaderWritableOption> header,
            ILogger<BlogController> logger)
        {
            blogRepository = repository;
            mapper = map;
            this.about = about;
            this.header = header;
            this.logger = logger;
            this.service = service;
        }

        [HttpGet("header")]
        public ActionResult<string> GetHeader()
        {
            return Ok(service.GetImage(GetHostPath(), header.Value.ImageId));
        }

        [HttpGet("about")]
        public ActionResult<AboutResponseDto> GetAbout()
        {
            return Ok(new AboutResponseDto
            {
                About = about.Value.About,
                ImageUri = service.GetImage(GetHostPath(), about.Value.ImageId)
            });
        }

        [HttpGet("posts/{page:int?}/{category}")]
        public ActionResult<ListResponse<Post>> GetPosts(string category, int page = 0)
        {
            category = category == "null" ? null : category;
            IEnumerable<Post> posts = blogRepository.GetPosts(page, category);
            List<ShortPostResponseDto> mappedPosts = posts.Select(x =>
            {
                ShortPostResponseDto mappedPost = (ShortPostResponseDto)x;
                mappedPost.ImageUri = service.GetImage(GetHostPath(), x.ImageGuid);
                return mappedPost;
            }).ToList();

            int maxPages = blogRepository.GetMaxPages(category);

            ListResponse<ShortPostResponseDto> result = new ListResponse<ShortPostResponseDto>()
            {
                CurrentPage = page,
                MaxPages = maxPages,
                Data = mappedPosts
            };
            return Ok(result);
        }

        [HttpGet("tags")]
        public ActionResult<List<string>> GetTags()
        {
            return Ok(blogRepository.GetTags().ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Post> GetPost(long id, [FromQuery]bool shortPost = false)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                if (shortPost)
                {
                    ShortPostResponseDto result = (ShortPostResponseDto)post;
                    result.ImageUri = service.GetImage(GetHostPath(), post.ImageGuid);
                    return Ok(result);
                }
                else
                {
                    PostResponseDto result = (PostResponseDto)post;
                    result.ImageUri = service.GetImage(GetHostPath(), post.ImageGuid);
                    return Ok(result);
                }
            }

            return NotFound(id);
        }

        [HttpGet("comments/{id}")]
        public ActionResult<IEnumerable<Comment>> GetAllPostComments(long id)
        {
            Post post = blogRepository.GetById(id);

            if (post == null)
            {
                return NotFound(id);
            }

            return Ok(post.Comments);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("new")]
        public async Task<ActionResult> CreatePost([FromForm]PostNewRequestDto post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post newPost = mapper.Map<Post>(post);
            newPost.ImageGuid = await service.SaveImageToFile(post.Image);
            newPost.Categories = newPost.Categories[0]?.Split(',').ToList();
            newPost.Categories = newPost.Categories?.Distinct().ToList();
            blogRepository.Create(newPost);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPatch("{id}")]
        public async Task<ActionResult> EditPost([FromForm]PostEditRequestDto post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(post);
            }

            Post p = blogRepository.GetById(post.Id);

            if (p != null)
            {
                if (!post.UseExistingImage)
                {
                    p.ImageGuid = await service.SaveImageToFile(post.Image);
                }
                p.Categories = post.Categories[0]?.Split(',').ToList();
                p.Categories = p.Categories?.Distinct().ToList();
                p.Content = post.Content;
                p.Title = post.Title;
                p.LastModified = DateTime.UtcNow;

                blogRepository.Update(p);

                return Ok();
            }

            return NotFound(post);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public ActionResult DeletePost(long id)
        {
            Post post = blogRepository.GetById(id);

            if (post != null)
            {
                service.DeleteImage(post.ImageGuid);
                blogRepository.Delete(post);
                return Ok();
            }

            return NotFound(id);
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

            return NotFound(id);
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

        private string GetHostPath()
        {
            return new Uri(string.Concat(HttpContext.Request.Scheme, "://", HttpContext.Request.Host.Value)).ToString();
        }
    }
}