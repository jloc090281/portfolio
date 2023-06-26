using System.ComponentModel.DataAnnotations;

namespace Services.Domain
{
    public class Post
    {
        public Guid BlogId { get; set; }
        public Guid? Id { get; set; }
        public DateTime? CreatedAt { get; set; }

        [Required(ErrorMessage = "Comment is required")]
        [StringLength(300, ErrorMessage = "Comment can't be longer than 300 characters")]
        public string Comment { get; set; }
    }
}