using System;
using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required]
        public int SenderId { get; set; }

        [Required]
        public int ReceiverId { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Message text cannot be longer than 500 characters.")]
        public string Text { get; set; }

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        // Foreign key to Chat
        public int ChatId { get; set; }  // Foreign key to the Chat

    }
}
