using Services.Domain;

namespace Services.Service
{
public interface IBlogService
    {
        Blog? getBlog(Guid id);
        Blog saveBlog(Blog blog);
        void archiveBlog(Guid id);
        IEnumerable<Blog>? getBlogList();
        IEnumerable<Blog>? filterBlogList(BlogStatus? status, string title, string description);
        Post postToBlog(Post post);
    }
}