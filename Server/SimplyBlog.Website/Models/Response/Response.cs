namespace SimplyBlog.Website.Models.Response
{
    public class Response
    {
        public string Error { get; set; }

        public override string ToString()
        {
            return Error;
        }
    }
}
