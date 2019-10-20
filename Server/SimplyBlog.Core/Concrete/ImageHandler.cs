using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SimplyBlog.Core.Concrete
{
    public static class ImageHandler
    {
        public static string BasePath { get { return Path.Combine(Environment.CurrentDirectory, @"Data"); } }
        public static string PublicPath { get { return @"/static"; } }
        //todo remove ref to aspnetcore
        public static async Task<Guid?> SaveImageToFile(IFormFile image, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (image?.Length > 0)
            {
                Guid fileName = Guid.NewGuid();
                DirectoryInfo destination = Directory.CreateDirectory(Path.Combine(BasePath, "images"));
                string filePath = Path.Combine(destination.FullName, fileName.ToString());
                using (FileStream stream = new FileStream(filePath.ToString() + ".jpeg", FileMode.Create))
                {
                    await image.CopyToAsync(stream, cancellationToken);
                    return fileName;
                }
            }
            return null;
        }

        public static string GetImageUri(string hostPath, Guid? id)
        {
            if (!id.HasValue)
            {
                return null;
            }

            return new Uri((string.Concat(hostPath.ToString(), PublicPath.TrimStart('/'), "/images/", id.ToString() + ".jpeg"))).ToString();
        }

        public static void DeleteImage(Guid? id)
        {
            if (id == null)
            {
                return;
            }

            File.Delete(Path.Combine(BasePath, "images", id.ToString() + ".jpeg"));
        }
    }
}
