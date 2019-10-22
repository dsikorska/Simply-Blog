using System;

namespace SimplyBlog.Website.Models.DTOs
{
    public class LoginResponseDto : Response.Response
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
