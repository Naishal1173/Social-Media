using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using WeconnectAdmin.Models;

namespace WeconnectAdmin.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        public string? OTP { get; set; } // Make OTP nullable

        public bool IsVerified { get; set; }


        // Navigation Properties (existing)
        [JsonIgnore]
        public virtual ICollection<Story> Stories { get; set; } = new HashSet<Story>();

        [JsonIgnore]
        public virtual ICollection<Post> Posts { get; set; } = new HashSet<Post>();

        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();

        [JsonIgnore]
        public virtual ICollection<Like> Likes { get; set; } = new HashSet<Like>();

        [JsonIgnore]
        public virtual ICollection<FollowRequest> FollowRequestsSent { get; set; } = new HashSet<FollowRequest>();

        [JsonIgnore]
        public virtual ICollection<FollowRequest> FollowRequestsReceived { get; set; } = new HashSet<FollowRequest>();

        [JsonIgnore]
        public virtual ICollection<User> Followers { get; set; } = new HashSet<User>();

        [JsonIgnore]
        public virtual ICollection<User> Following { get; set; } = new HashSet<User>();

        [JsonIgnore]
        public virtual ICollection<Message> SentMessages { get; set; } = new HashSet<Message>();

        [JsonIgnore]
        public virtual ICollection<Message> ReceivedMessages { get; set; } = new HashSet<Message>();

        [JsonIgnore]
        public virtual ICollection<Chat> Chats { get; set; } = new HashSet<Chat>();

        [JsonIgnore]
        public ICollection<Notification> Notifications { get; set; }
    }
}