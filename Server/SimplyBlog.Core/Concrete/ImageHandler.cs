using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Concrete
{
    public static class ImageHandler
    {
        public static string BasePath { get { return Path.Combine(Environment.CurrentDirectory, @"Data"); } }
        public static string PublicPath { get { return @"/static"; } }

        public static async Task<Guid?> SaveImageToFile(IFormFile image)
        {
            if (image?.Length > 0)
            {
                Guid fileName = Guid.NewGuid();
                DirectoryInfo destination = Directory.CreateDirectory(Path.Combine(BasePath, "images"));
                string filePath = Path.Combine(destination.FullName, fileName.ToString());
                using (FileStream stream = new FileStream(filePath.ToString() + ".jpeg", FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                    return fileName;
                }
            }
            return null;
        }

        public static string GetImageUri(Guid? id)
        {
            if (!id.HasValue)
            {
                return null;
            }

            return Path.Combine(PublicPath, "images", id.ToString() + ".jpeg");
        }
    }
}
