using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeconnectAdmin.Data;
using WeconnectAdmin.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChatController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Fetch all users except the current user for chat purposes
    [HttpGet("users/{userId}")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsersForChat(int userId)
    {
        var user = await _context.Users
            .Include(u => u.Following)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        // Get users the current user is following
        var followingUsers = user.Following
            .Select(f => new { f.Id, f.Username })
            .ToList();

        if (!followingUsers.Any())
        {
            return Ok(new List<object>());
        }

        return Ok(followingUsers);
    }


    [HttpPost("start")]
    public async Task<ActionResult<int>> StartChat([FromBody] List<int> userIds)
    {
        if (userIds == null || userIds.Count < 2)
        {
            return BadRequest("At least two users are required to start a chat.");
        }

        var initiatingUserId = userIds.First();
        var initiatingUser = await _context.Users
            .Include(u => u.Following)
            .FirstOrDefaultAsync(u => u.Id == initiatingUserId);

        if (initiatingUser == null)
        {
            return NotFound("Initiating user not found.");
        }

        // Ensure both users are following each other
        var validUsers = initiatingUser.Following
            .Select(f => f.Id)
            .Intersect(userIds.Skip(1)) // Check the rest of the users
            .ToList();

        if (validUsers.Count != userIds.Count - 1)
        {
            return BadRequest("You can only start a chat with users you are following.");
        }

        // Proceed with chat creation logic
        userIds.Sort();
        var existingChat = await _context.Chats
            .Where(c => c.Users.Count == userIds.Count && c.Users.All(u => userIds.Contains(u.Id)))
            .Include(c => c.Users)
            .FirstOrDefaultAsync();

        if (existingChat != null)
        {
            return Ok(existingChat.Id);
        }

        var users = await _context.Users.Where(u => userIds.Contains(u.Id)).ToListAsync();

        var chat = new Chat
        {
            Users = users
        };

        _context.Chats.Add(chat);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetChatMessages), new { chatId = chat.Id }, chat.Id);
    }


    // Get all messages in a chat by chat ID
    [HttpGet("{chatId}")]
    public async Task<IActionResult> GetChatMessages(int chatId)
    {
        var chat = await _context.Chats
            .Where(c => c.Id == chatId)
            .Include(c => c.Messages)
            .FirstOrDefaultAsync();

        if (chat == null)
        {
            return NotFound("Chat not found");
        }

        return Ok(chat.Messages);
    }

    // Fetch chat by ID (the new method added)
    [HttpGet("fetch/{chatId}")]
    public async Task<IActionResult> FetchChatById(int chatId)
    {
        var chat = await _context.Chats
            .Where(c => c.Id == chatId)
            .Include(c => c.Users)
            .Include(c => c.Messages)
            .FirstOrDefaultAsync();

        if (chat == null)
        {
            return NotFound("Chat not found");
        }

        return Ok(new
        {
            chat.Id,
            Users = chat.Users.Select(u => new { u.Id, u.Username }),
            Messages = chat.Messages.Select(m => new
            {
                m.Id,
                m.Text,
                m.SenderId,
                m.ReceiverId,
                m.SentAt
            })
        });
    }

    // Send a message in the chat
    [HttpPost("message")]
    public async Task<ActionResult> SendMessage([FromBody] Message message)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList();
            return BadRequest(new { message = "Validation failed", errors });
        }

        if (message == null || string.IsNullOrWhiteSpace(message.Text))
        {
            return BadRequest("Message text is required.");
        }

        if (message.SenderId <= 0 || message.ReceiverId <= 0)
        {
            return BadRequest("Valid SenderId and ReceiverId are required.");
        }

        var sender = await _context.Users.FindAsync(message.SenderId);
        var receiver = await _context.Users.FindAsync(message.ReceiverId);

        if (sender == null || receiver == null)
        {
            return NotFound("Sender or Receiver not found.");
        }

        // Fetch the chat between sender and receiver
        var chat = await _context.Chats
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c =>
                c.Users.Any(u => u.Id == message.SenderId) &&
                c.Users.Any(u => u.Id == message.ReceiverId));

        if (chat == null)
        {
            return NotFound("Chat not found.");
        }

        message.SentAt = DateTime.UtcNow;
        chat.Messages.Add(message); // Add message to the chat's message list
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message.Id,
            message.SenderId,
            message.ReceiverId,
            message.Text,
            message.SentAt
        });
    }

    // Delete a chat
    [HttpDelete("delete/{chatId}")]
    public async Task<IActionResult> DeleteChat(int chatId)
    {
        var chat = await _context.Chats
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == chatId);

        if (chat == null)
        {
            return NotFound("Chat not found.");
        }

        // Delete all messages in the chat first
        _context.Messages.RemoveRange(chat.Messages);

        // Then delete the chat itself
        _context.Chats.Remove(chat);
        await _context.SaveChangesAsync();

        return Ok("Chat deleted successfully.");
    }
}
