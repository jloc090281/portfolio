using Services.Domain;

namespace Services.Service
{
public interface IBlogService
    {
        Blog? getBlog(Guid id);
        Blog saveBlog(Blog blog);
        void archiveBlog(Guid id);
        IEnumerable<Blog>? getBlogList();
        IEnumerable<Blog>? filterBlogList(string title, string description, BlogStatus? status, DateTime? createdAt);
        Post postToBlog(Post post);
    }
}