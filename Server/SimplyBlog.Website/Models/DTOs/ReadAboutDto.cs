using System.Collections.Generic;

namespace SimplyBlog.Website.Models.DTOs
{
    public class ReadAboutDto
    {
        public string About { get; set; }
        public string ImageUri { get; set; }
        public Dictionary<string, string> Contacts { get; set; } = new Dictionary<string, string>();
    }
}
