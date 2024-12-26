using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Chat
    {
        public int Id { get; set; }

        // A Chat can have multiple participants
        public ICollection<User> Users { get; set; } = new HashSet<User>();

        public ICollection<Message> Messages { get; set; } = new HashSet<Message>();
    }
}
