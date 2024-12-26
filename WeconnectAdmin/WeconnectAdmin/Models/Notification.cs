using System;
using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; } // The user receiving the notification
        public User User { get; set; }

        public int PostId { get; set; } // The post related to the notification
        public Post Post { get; set; }

        public string Message { get; set; } // The notification message

        public bool IsRead { get; set; } // Indicates whether the notification is read

        public DateTime CreatedAt { get; set; } // The time when the notification was created
    }
}
