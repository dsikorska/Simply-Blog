using System.Collections.Generic;
using System.Linq;
using SimplyBlog.Core.Abstract;

namespace SimplyBlog.Core.Concrete
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private readonly XmlContext _context;
        private IList<T> _entities;

        public Repository(XmlContext context)
        {
            _context = context;
        }

        protected IQueryable<T> Entities { get { return XmlEntities.AsQueryable(); } }
        protected IList<T> XmlEntities { get { return _entities ?? (_entities = _context.Set<T>()); } }

        public virtual void Create(T entity)
        {
            if (!Entities.Contains(entity))
            {
                XmlEntities.Add(entity);
                _context.SaveChanges<T>(XmlEntities);
            }
        }

        public virtual void Delete(T entity)
        {
            if (XmlEntities.Contains(entity))
            {
                XmlEntities.Remove(entity);
                _context.SaveChanges<T>(XmlEntities);
            }
        }

        public virtual IEnumerable<T> GetAll()
        {
            return XmlEntities;
        }

        public virtual void Update(T entity)
        {
            _context.SaveChanges<T>(XmlEntities);
        }
    }
}
