using System.Collections.Generic;

namespace SimplyBlog.Core.Abstract
{
    public interface IRepository<T> where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Update(T entity);
    }
}
