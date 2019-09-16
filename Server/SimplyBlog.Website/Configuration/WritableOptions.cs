using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SimplyBlog.Website.Configuration
{
    public class WritableOptions<T> : IWritableOptions<T> where T : class, new()
    {
        private readonly IHostingEnvironment _environment;
        private readonly IOptionsMonitor<T> _options;
        private readonly IConfigurationRoot _configuration;
        private readonly string _section;
        private readonly string _file;

        public WritableOptions(IHostingEnvironment env, IOptionsMonitor<T> opt, IConfigurationRoot cfg, string section, string file)
        {
            _environment = env;
            _options = opt;
            _configuration = cfg;
            _section = section;
            _file = file;
        }

        public T Value => _options.CurrentValue;
        public T Get(string name) => _options.Get(name);

        public void Update(Action<T> applyChanges)
        {
            Microsoft.Extensions.FileProviders.IFileProvider fileProvider = _environment.ContentRootFileProvider;
            Microsoft.Extensions.FileProviders.IFileInfo fileInfo = fileProvider.GetFileInfo(_file);
            string physicalPath = fileInfo.PhysicalPath;

            JObject jsonObject = JsonConvert.DeserializeObject<JObject>(File.ReadAllText(physicalPath));
            T sectionObject = jsonObject.TryGetValue(_section, out JToken section) ? JsonConvert.DeserializeObject<T>(section.ToString()) : (Value ?? new T());

            applyChanges(sectionObject);

            jsonObject[_section] = JObject.Parse(JsonConvert.SerializeObject(sectionObject));
            File.WriteAllText(physicalPath, JsonConvert.SerializeObject(jsonObject, Formatting.Indented));
            _configuration.Reload();
        }
    }
}
