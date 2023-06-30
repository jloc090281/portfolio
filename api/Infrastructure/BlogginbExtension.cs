using System.Linq;
using Services.Domain;

namespace Services.Infrastructure
{
    public static class BlogginbExtension
    {
        public static void EnsureSeedData(this BloggingContext context)
        {
            if (!context.Blogs.Any())
            {
                Guid firstBlogId = Guid.NewGuid();
                Guid secondBlogId = Guid.NewGuid();

                context.Blogs.AddRange(
                    new Blog {
                        Id = firstBlogId,
                        CreatedAt = DateTime.Now,
                        Title = "Coffee Mug (Blue)",
                        Description = "Coffee and pets... what else could you need! Our flagship pet printed on a high quality coffee mug.",
                        Status = BlogStatus.Private,
                    },
                    new Blog {
                        Id = secondBlogId,
                        CreatedAt = DateTime.Now.AddMinutes(1),
                        Title = "Coffee Mug (Green)",
                        Description = "Coffee and pets... what else could you need! Our flagship pet printed on a high quality coffee mug.",
                        Status = BlogStatus.Public
                    },
                    new Blog {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now.AddMinutes(2),
                        Title = "Coffee Mug (Pink)",
                        Description = "Coffee and pets... what else could you need! Our flagship pet printed on a high quality coffee mug.",
                        Status = BlogStatus.Private
                    },
                    new Blog {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now.AddMinutes(3),
                        Title = "Coffee Mug (White)",
                        Description = "Coffee and pets... what else could you need! Our flagship pet printed on a high quality coffee mug.",
                        Status = BlogStatus.Archived
                    },
                    new Blog {
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now.AddHours(1),
                        Title = "Coffee Mug (Yellow)",
                        Description = "Share your love of pets with the world. Quality cotton t-shirt with a long lasting print.",
                        Status = BlogStatus.Archived
                    }
                );

                context.Posts.AddRange(
                    new Post {
                        BlogId = firstBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now.AddHours(1),
                        Comment = "The term-limited legislator is much closer to that traditional Kent County."
                    },
                    new Post {
                        BlogId = firstBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        Comment = "Cohousing has shown itself to be a useful living arrangement for groups of people with all sorts of priorities.",
                    },
                    new Post {
                        BlogId = firstBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        Comment = "On Thursday, Boy Scouts of America President Bob Gates called for the end to the organization’s ban on gay adults who serve as troop leaders or have other roles within the organization.",
                    },
                    new Post {
                        BlogId = firstBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now.AddHours(1),
                        Comment = "The term-limited legislator is much closer to that traditional Kent County."
                    },
                    new Post {
                        BlogId = secondBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        Comment = "On Thursday, Boy Scouts of America President Bob Gates called for the end to the organization’s ban on gay adults who serve as troop leaders or have other roles within the organization.",
                    },
                    new Post {
                        BlogId = secondBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        Comment = "On Thursday, Boy Scouts of America President Bob Gates called for the end to the organization’s ban on gay adults who serve as troop leaders or have other roles within the organization.",
                    },
                    new Post {
                        BlogId = secondBlogId,
                        Id = Guid.NewGuid(),
                        CreatedAt = DateTime.Now,
                        Comment = "Cohousing has shown itself to be a useful living arrangement for groups of people with all sorts of priorities.",
                    }
                );

                context.SaveChanges();
            }
        }
    }
}