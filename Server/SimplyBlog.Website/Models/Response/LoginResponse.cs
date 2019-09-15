using System;

namespace SimplyBlog.Website.Models.Response
{
    public class LoginResponse : Response
    {
        public string Token { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
