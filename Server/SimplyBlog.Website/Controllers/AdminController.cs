using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Website.Models;
using SimplyBlog.Website.Models.DTOs;
using SimplyBlog.Website.Models.Response;

namespace SimplyBlog.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppService service;

        public AdminController(AppService service)
        {
            this.service = service;
        }
        //todo images manager
        [HttpPost("auth")]
        public ActionResult Authenticate(LoginModel model)
        {
            LoginResponse response = service.Authenticate(model.Username, model.Password);

            if (response.Error != null)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("credential")]
        public ActionResult ChangePassword(CredentialDto model)
        {
            service.UpdateCredential(model);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("about")]
        public async Task<ActionResult> UpdateAbout([FromForm]EditAboutDto model)
        {
            await service.UpdateAbout(model);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("header")]
        public async Task<ActionResult> UpdateHeader(IFormFile image)
        {
            await service.UpdateHeader(image);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("upload")]
        public async Task<ActionResult> UploadImage(IFormFile image)
        {
            string url = await service.UploadImage(GetHostPath(), image);
            return Ok(url);
        }

        private string GetHostPath()
        {
            return new Uri(string.Concat(HttpContext.Request.Scheme, "://", HttpContext.Request.Host.Value)).ToString();
        }
    }
}