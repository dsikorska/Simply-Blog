namespace SimplyBlog.Website.Models.Response
{
    public class Response<T> where T : class
    {
        public string Error { get; set; }
        public T Data { get; set; }
    }
}
