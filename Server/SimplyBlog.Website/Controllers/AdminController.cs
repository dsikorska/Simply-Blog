using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
        [HttpPost("changePassword/{value}")]
        public ActionResult ChangePassword(string value)
        {
            service.ChangePassword(value);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("changeLogin/{value}")]
        public ActionResult ChangeLogin(string value)
        {
            service.ChangeLogin(value);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("changeSecret/{value}")]
        public ActionResult ChangeSecret(string value)
        {
            service.ChangeSecret(value);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("about")]
        public async Task<ActionResult> ChangeSecret([FromForm]EditAboutDto model)
        {
            await service.UpdateAbout(model);
            return Ok();
        }
    }
}