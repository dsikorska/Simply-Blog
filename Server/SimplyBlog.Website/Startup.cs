using System;
using System.IO;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Concrete;
using SimplyBlog.Website.Configuration;
using SimplyBlog.Website.Mapping;

namespace SimplyBlog.Website
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            // Ref: https://forums.asp.net/t/2148624.aspx?can+we+update+appsettings+json+in+controller+
            services.ConfigureWritable<CredentialWritableOption>(Configuration.GetSection("credentials"));
            services.ConfigureWritable<AboutWritableOption>(Configuration.GetSection("about"));
            services.ConfigureWritable<HeaderWritableOption>(Configuration.GetSection("header"));

            string path = Environment.CurrentDirectory + @"\Data";
            Directory.CreateDirectory(path);

            services.AddTransient(x => new XmlContext(path));
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient(typeof(AppService));

            MapperConfiguration mappingConfig = new MapperConfiguration(config => config.AddProfile(new DtosMappingProfile()));
            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddCors();

            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            // Ref: https://jasonwatmore.com/post/2018/08/14/aspnet-core-21-jwt-authentication-tutorial-with-example-api
            // Ref: https://www.blinkingcaret.com/2017/09/06/secure-web-api-in-asp-net-core/
            byte[] key = Encoding.ASCII.GetBytes(Configuration.GetSection("credentials")["secret"].ToString());
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(ImageHandler.BasePath),
                RequestPath = ImageHandler.PublicPath
            });

            app.UseCors(policy =>
            {
                policy.AllowAnyHeader();
                policy.AllowAnyMethod();
                policy.AllowAnyOrigin();
            });

            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseStatusCodePages();
            }

            app.UseMvc();
        }
    }
}
