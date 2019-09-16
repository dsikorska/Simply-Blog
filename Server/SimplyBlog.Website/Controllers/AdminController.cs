﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimplyBlog.Website.Models;
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
        [HttpPost("changePassword")]
        public ActionResult ChangePassword([FromQuery]string value)
        {
            service.ChangePassword(value);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("changeLogin")]
        public ActionResult ChangeLogin([FromQuery]string value)
        {
            service.ChangeLogin(value);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("changeSecret")]
        public ActionResult ChangeSecret([FromQuery]string value)
        {
            service.ChangeSecret(value);
            return Ok();
        }
    }
}