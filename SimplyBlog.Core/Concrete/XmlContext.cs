using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;

namespace SimplyBlog.Core.Concrete
{
    public class XmlContext
    {
        private readonly string _xmlFileLocation;

        public XmlContext(string path)
        {
            _xmlFileLocation = path;
        }

        public void SaveChanges<T>(IList<T> entities) where T : class
        {
            if (entities == null)
            {
                return;
            }

            string filePath = Path.Combine(_xmlFileLocation, $"{typeof(T).Name}.xml");
            using (StreamWriter writer = new StreamWriter(filePath))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<T>));
                serializer.Serialize(writer, entities);
                writer.Flush();
            }
        }

        public IList<T> Set<T>() where T : class
        {
            string filePath = Path.Combine(_xmlFileLocation, $"{typeof(T).Name}.xml");
            IList<T> entities = new List<T>();
            if (File.Exists(filePath))
            {
                using (FileStream stream = File.OpenRead(filePath))
                {
                    XmlSerializer serializer = new XmlSerializer(typeof(List<T>));
                    entities = serializer.Deserialize(stream) as List<T>;
                }
            }
            return entities.ToList();
        }
    }
}
