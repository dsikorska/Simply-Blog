using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Controllers;
using SimplyBlog.Website.Mapping;
using SimplyBlog.Website.Models.Response;

namespace SimplyBlog.Tests
{
    [TestFixture]
    public class BlogCtrlTests
    {
        private BlogController blogController;

        [SetUp]
        public void Setup()
        {
            FakeBlogRepository blogRepository = new FakeBlogRepository();
            MapperConfiguration mappingConfig = new MapperConfiguration(config => config.AddProfile(new DtosMappingProfile()));
            IMapper mapper = mappingConfig.CreateMapper();
            blogController = new BlogController(blogRepository, mapper);
        }

        [Test]
        public void GetAllPosts()
        {
            ActionResult<ListResponse<Post>> result = blogController.GetPosts(null);

            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.IsNotNull((result.Result as OkObjectResult).Value);
        }

        [Test]
        public void GetPost()
        {
            ActionResult<Post> result = blogController.GetPost(0);

            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.IsNotNull((result.Result as OkObjectResult).Value);
        }

        [Test]
        public void GetAllPostComments()
        {
            ActionResult<IEnumerable<Comment>> result = blogController.GetAllPostComments(0);

            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            Assert.IsNotNull((result.Result as OkObjectResult).Value);
        }

        [Test]
        public async Task CreatePost_NotValidModel_ReturnsBadRequest()
        {
            blogController.ModelState.AddModelError("", "");

            ActionResult result = await blogController.CreatePost(new Website.Models.DTOs.PostNewRequestDto());

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            Assert.IsNotNull((result as BadRequestObjectResult).Value);
        }

        [Test]
        public async Task CreatePost_ValidModel_ReturnsOk()
        {
            ActionResult result = await blogController.CreatePost(
                new Website.Models.DTOs.PostNewRequestDto
                {
                    Categories = new List<string> { "test" },
                    Content = "test",
                    Image = null,
                    Title = "test"
                });

            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task EditPost_ValidModel_ReturnsOk()
        {
            ActionResult result = await blogController.EditPost(
                new Website.Models.DTOs.PostEditRequestDto
                {
                    Title = "test",
                    Image = null,
                    Content = "test",
                    Categories = new List<string> { "test" },
                    UseExistingImage = true
                });

            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public async Task EditPost_NotValidModel_ReturnsBadRequest()
        {
            blogController.ModelState.AddModelError("", "");

            ActionResult result = await blogController.EditPost(new Website.Models.DTOs.PostEditRequestDto());

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            Assert.IsNotNull((result as BadRequestObjectResult).Value);
        }

        [Test]
        public void DeletePost()
        {
            ActionResult result = blogController.DeletePost(0);

            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public void CreateComment_NotValidModel_ReturnsBadRequest()
        {
            blogController.ModelState.AddModelError("", "");

            ActionResult result = blogController.CreateComment(0, new Comment());

            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            Assert.IsNotNull((result as BadRequestObjectResult).Value);
        }

        [Test]
        public void CreateComment_ValidModel_ReturnsOk()
        {
            ActionResult result = blogController.CreateComment(0, new Comment());

            Assert.IsInstanceOf<OkResult>(result);
        }

        [Test]
        public void DeleteComment_BadId_ReturnsNotFound()
        {
            ActionResult result = blogController.DeleteComment(0, Guid.NewGuid());

            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
