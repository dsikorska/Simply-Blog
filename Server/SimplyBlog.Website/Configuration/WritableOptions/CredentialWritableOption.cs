namespace SimplyBlog.Website.Configuration
{
    public class CredentialWritableOption
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Secret { get; set; }

        public CredentialWritableOption()
        {
            Login = "admin";
            Password = "O97FhgXBHpJEa2gTVYiE9hbZNsylZHdPCpYwEqK4FnXhM4YB";
            Secret = "qwertyuiopasdfghjklzxcvbnmqwertyqwertyuiopasdfghjklzxcvbnmqwerty";
        }
    }
}
