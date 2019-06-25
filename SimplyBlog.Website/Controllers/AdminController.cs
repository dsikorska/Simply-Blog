using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Website.Models;

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
            string token = service.Authenticate(model.Username, model.Password);

            if (token == null)
            {
                return BadRequest(model);
            }

            return Ok(token);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("hash")]
        public ActionResult GetHash(string input)
        {
            return Ok(AppService.HashPassword(input));
        }
    }
}