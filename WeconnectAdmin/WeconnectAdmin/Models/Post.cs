using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Post title is required.")]
        public string Title { get; set; } // New Title field

        [Required(ErrorMessage = "Image path is required.")]
        public string ImagePath { get; set; }

        [Required(ErrorMessage = "Caption is required.")]
        public string Caption { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual User User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<Like> Likes { get; set; } = new List<Like>();
    }
}
