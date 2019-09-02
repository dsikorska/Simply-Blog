using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Concrete
{
    public static class ImageHandler
    {
        private static string BasePath { get { return Path.Combine(Environment.CurrentDirectory, @"Data\Images"); } }

        public static async Task<Guid?> SaveImageToFile(IFormFile image)
        {
            if (image?.Length > 0)
            {
                Guid fileName = Guid.NewGuid();
                DirectoryInfo destination = Directory.CreateDirectory(BasePath);
                string filePath = Path.Combine(destination.FullName, fileName.ToString());
                using (FileStream stream = new FileStream(filePath.ToString(), FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                    return fileName;
                }
            }
            return null;
        }

        public static string GetImageUri(Guid id)
        {
            return Path.Combine(BasePath, id.ToString());
        }
    }
}
