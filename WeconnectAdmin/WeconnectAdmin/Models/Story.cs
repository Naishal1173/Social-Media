using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeconnectAdmin.Models
{
    public class Story
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; } // Foreign key for User (int to match User's primary key)

        [Required]
        public string Username { get; set; }

        [Required]
        public string ImagePath { get; set; } // Path to the uploaded image file

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for User
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
