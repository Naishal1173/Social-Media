using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeconnectAdmin.Data;
using WeconnectAdmin.Models;
using System.Linq;
using System.Threading.Tasks;

namespace WeconnectAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get Notifications for a user
        [HttpGet("{userId}/notifications")]
        public async Task<IActionResult> GetNotifications(int userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId) // Ensure that notifications are filtered by the correct UserId
                .OrderByDescending(n => n.CreatedAt) // Order by most recent
                .Select(n => new
                {
                    n.Id,
                    n.Message,
                    n.CreatedAt,
                    n.IsRead
                })
                .ToListAsync();

            if (notifications == null || notifications.Count == 0)
            {
                return NotFound("No notifications found for this user.");
            }

            return Ok(notifications);
        }


        // Mark a notification as read
        [HttpPut("{notificationId}/read")]
        public async Task<IActionResult> MarkAsRead(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);

            if (notification == null)
            {
                return NotFound("Notification not found.");
            }

            notification.IsRead = true;
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notification marked as read." });
        }

        // Delete a notification
        [HttpDelete("{notificationId}")]
        public async Task<IActionResult> DeleteNotification(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);

            if (notification == null)
            {
                return NotFound("Notification not found.");
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notification deleted successfully." });
        }

    }
}
