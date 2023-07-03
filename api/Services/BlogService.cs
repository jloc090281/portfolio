using Services.Domain;
using Services.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Services.Service
{
    public class BlogService: IBlogService
    {
        public Blog? getBlog(Guid id)
        {
            using (var context = new BloggingContext())
            {
                return context.Blogs?.FirstOrDefault(x => Object.Equals(x.Id, id));
            }
        }
        
        public Blog saveBlog(Blog blog)
        {
            using (var context = new BloggingContext())
            {
                blog.Id = Guid.NewGuid();
                blog.CreatedAt = DateTime.Now;
                context.Blogs?.Add(blog);
                context.SaveChanges();
            }
            return blog;
        }

        public void archiveBlog(Guid id)
        {
            using (var context = new BloggingContext())
            {
                Blog? existingBlog = context.Blogs?.FirstOrDefault(x => Object.Equals(x.Id, id));
                if (existingBlog != null)
                {
                    existingBlog.Status = BlogStatus.Archived;
                    context.SaveChanges();
                }
            }
        }

        public IEnumerable<Blog>? getBlogList()
        {
            using (var context = new BloggingContext())
            {
                return context.Blogs?.Include(blog => blog.Posts).ToList();
            }
        }

        public IEnumerable<Blog>? filterBlogList(string title, string description, BlogStatus? status, DateTime? createdAt)
        {
            using (var context = new BloggingContext())
            {
                var list = context.Blogs?.AsEnumerable();
                if (title != "") list = list?.Where(x => x.Title == title);
                if (description != "") list = list?.Where(x => x.Description == description);
                if (status != null) list = list?.Where(x => x.Status == status);
                if (createdAt != null) list = list?.Where(x => x.CreatedAt == createdAt);
                return list?.ToList();
            }
        }

        public Post postToBlog(Post post)
        {
            using (var context = new BloggingContext())
            {
                Blog? existingBlog = context.Blogs?.FirstOrDefault(x => Object.Equals(x.Id, post.BlogId));
                if (existingBlog != null)
                {
                    post.Id = Guid.NewGuid();
                    post.CreatedAt = DateTime.Now;
                    context.Posts?.Add(post);
                    context.SaveChanges();
                }
                return post;
            }

        }
    }
}