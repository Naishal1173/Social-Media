using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using WeconnectAdmin.Models;

public class FollowRequest
{
    public int Id { get; set; }

    [Required]
    [JsonPropertyName("senderId")]
    public int SenderId { get; set; }

    [Required]
    [JsonPropertyName("receiverId")]
    public int ReceiverId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [JsonIgnore]
    public virtual User Sender { get; set; }

    [JsonIgnore]
    public virtual User Receiver { get; set; }
}
