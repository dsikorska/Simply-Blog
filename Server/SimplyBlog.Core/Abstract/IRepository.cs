using System;

namespace SimplyBlog.Core.Abstract
{
    public interface IRepository<T> where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        T GetById(Guid id);
        void Update(T entity);
    }
}
