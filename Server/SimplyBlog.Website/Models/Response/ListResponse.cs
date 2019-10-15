using System.Collections.Generic;

namespace SimplyBlog.Website.Models.Response
{
    public class ListResponse<T> : Response
    {
        public List<T> Data { get; set; } = new List<T>();
        public int MaxPages { get; set; }
        public int CurrentPage { get; set; }
    }
}
