using Vonage.Voice.EventWebhooks;
using WeconnectAdmin.Data;
using WeconnectAdmin.Models;

public class NotificationService
{
    private readonly ApplicationDbContext _context;

    public NotificationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CreateLikeNotification(int postId, int userId)
    {
        var post = await _context.Posts.FindAsync(postId);
        var user = await _context.Users.FindAsync(userId);

        if (post == null || user == null) return;

        var notification = new Notification
        {
            UserId = post.UserId, // The user who owns the post (receiving the notification)
            PostId = postId,
            Message = $"{user.Username} liked your post.",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
    }


    public async Task CreateCommentNotification(int postId, int userId, string commentContent)
    {
        var post = await _context.Posts.FindAsync(postId);
        var user = await _context.Users.FindAsync(userId);

        if (post == null || user == null) return;

        var notification = new Notification
        {
            UserId = post.UserId, // The user who owns the post
            PostId = postId,
            Message = $"{user.Username} commented: {commentContent}",
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
    }
}
