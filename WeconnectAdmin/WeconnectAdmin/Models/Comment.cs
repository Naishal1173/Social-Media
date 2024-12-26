using System;
using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PostId { get; set; }
        [Required]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
