using System.ComponentModel.DataAnnotations;

public enum BlogStatus
{
    Active = 1,
    Archived = 2
}


namespace Services.Domain
{
    public class Blog
    {
        public Guid? Id { get; set; }

        public DateTime? CreatedAt { get; set; }
        
        [Required(ErrorMessage = "Title is required")]
        [StringLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description can't be longer than 500 characters")]
        public string Description { get; set; }

        public BlogStatus Status { get; set; }
        public DateTime? ArchivedAt { get; set; }

        public ICollection<Post> Posts { get; } = new List<Post>();
    }
}