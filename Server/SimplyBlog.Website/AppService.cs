using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace SimplyBlog.Website
{
    public class AppService
    {
        private readonly IConfiguration configuration;

        public AppService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string Authenticate(string username, string password)
        {
            if (!ValidateUser(username, password))
            {
                return null;
            }

            byte[] key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("secret"));
            string token = GetSecurityToken(key, username);

            return token;
        }

        private string GetSecurityToken(byte[] key, string username)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public bool ValidateUser(string username, string password)
        {
            IConfigurationSection credentials = configuration.GetSection("credentials");
            string name = credentials["username"];
            string hash = credentials["hash"];

            bool validPassword = VerifyPassword(hash, password);

            return username == name && validPassword;
        }

        //Ref: https://medium.com/@mehanix/lets-talk-security-salted-password-hashing-in-c-5460be5c3aae
        public static string HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            Rfc2898DeriveBytes encryption = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hashed = encryption.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hashed, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        public static bool VerifyPassword(string hash, string password)
        {
            byte[] hashBytes = Convert.FromBase64String(hash);
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            Rfc2898DeriveBytes encryption = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hashedPassword = encryption.GetBytes(20);

            bool valid = true;
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hashedPassword[i])
                {
                    valid = false;
                }
            }

            return valid;
        }
    }
}
