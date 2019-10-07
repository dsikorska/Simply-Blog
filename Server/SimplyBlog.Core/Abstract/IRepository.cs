namespace SimplyBlog.Core.Abstract
{
    public interface IRepository<T> where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}
