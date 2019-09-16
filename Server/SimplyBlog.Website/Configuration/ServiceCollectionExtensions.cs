using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace SimplyBlog.Website.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureWritable<T>(this IServiceCollection services, IConfigurationSection section, string file = "appsettings.json") where T : class, new()
        {
            services.Configure<T>(section);
            services.AddTransient<IWritableOptions<T>>(provider =>
            {
                IConfigurationRoot cfg = (IConfigurationRoot)provider.GetService<IConfiguration>();
                IHostingEnvironment env = provider.GetService<IHostingEnvironment>();
                IOptionsMonitor<T> opt = provider.GetService<IOptionsMonitor<T>>();
                return new WritableOptions<T>(env, opt, cfg, section.Key, file);
            });
        }
    }
}
