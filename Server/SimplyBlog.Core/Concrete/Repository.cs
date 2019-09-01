using System;
using System.Collections.Generic;
using System.Linq;
using SimplyBlog.Core.Abstract;
using SimplyBlog.Core.Models;

namespace SimplyBlog.Core.Concrete
{
    public class Repository<T> : IRepository<T> where T : Entity<Guid>
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
            if (XmlEntities.Any(x => x.Id.Equals(entity.Id)))
            {
                XmlEntities.Remove(entity);
                _context.SaveChanges<T>(XmlEntities);
            }
        }

        public virtual IEnumerable<T> GetAll()
        {
            return XmlEntities;
        }

        public virtual T GetById(Guid id)
        {
            return Entities.FirstOrDefault(x => x.Id.Equals(id));
        }

        public virtual void Update(T entity)
        {
            _context.SaveChanges<T>(XmlEntities);
        }
    }
}
