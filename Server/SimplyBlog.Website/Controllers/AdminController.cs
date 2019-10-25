using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SimplyBlog.Core.Concrete;
using SimplyBlog.Core.Models;
using SimplyBlog.Website.Models;
using SimplyBlog.Website.Models.DTOs;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppService service;
        private readonly ILogger<AdminController> logger;

        public AdminController(AppService service, ILogger<AdminController> logger)
        {
            this.service = service;
            this.logger = logger;
        }

        [HttpPost("auth")]
        public ActionResult Authenticate(LoginModel model)
        {
            LoginResponseDto response = service.Authenticate(model.Username, model.Password);

            if (response.Error != null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("credential")]
        public ActionResult UpdateCredential(CredentialRequestDto model)
        {
            service.UpdateCredential(model);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("about")]
        public async Task<ActionResult> UpdateAbout([FromForm]AboutRequestDto model)
        {
            await service.UpdateAbout(model);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("header")]
        public async Task<ActionResult> UpdateHeader(IFormFile image)
        {
            Guid? imageId = await service.UpdateHeader(image);
            return Ok(ImageHandler.GetImageUri(GetHostPath(), imageId));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("upload")]
        public async Task<ActionResult> UploadImage(IFormFile image)
        {
            string url = await service.UploadImage(GetHostPath(), image);
            return Ok(url);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("images")]
        public ActionResult GetImages()
        {
            IEnumerable<ImageDto> images = service.GetImages(GetHostPath());
            return Ok(images);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("images/{id}")]
        public ActionResult DeleteImage(Guid id)
        {
            service.DeleteImage(id);
            return Ok();
        }

        private string GetHostPath()
        {
            return new Uri(string.Concat(HttpContext.Request.Scheme, "://", HttpContext.Request.Host.Value)).ToString();
        }
    }
}