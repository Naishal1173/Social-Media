using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WeconnectAdmin.Models;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using WeconnectAdmin.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WeconnectAdmin.DTO;
using WeconnectAdmin.Services;

namespace WeconnectAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Upload Post
        [HttpPost("upload")]
        public async Task<IActionResult> UploadPost([FromForm] IFormFile imageFile, [FromForm] int userId, [FromForm] string caption, [FromForm] string title)
        {
            if (imageFile == null || imageFile.Length == 0)
                return BadRequest("No image file uploaded.");

            if (userId <= 0)
                return BadRequest("Invalid user ID.");

            if (string.IsNullOrWhiteSpace(caption))
                return BadRequest("Caption cannot be empty.");

            if (string.IsNullOrWhiteSpace(title))
                return BadRequest("Title cannot be empty.");

            var uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            var fileName = Path.GetFileNameWithoutExtension(imageFile.FileName);
            var uniqueFileName = $"{fileName}_{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var filePath = Path.Combine(uploadsDirectory, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var post = new Post
            {
                UserId = userId,
                Title = title,
                ImagePath = $"/uploads/{uniqueFileName}",
                Caption = caption,
                CreatedAt = DateTime.UtcNow
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            var postWithUsername = new
            {
                post.Id,
                post.Title,
                post.ImagePath,
                post.Caption,
                post.CreatedAt,
                User = user.Username // Include the username in the response
            };

            return CreatedAtAction(nameof(GetPostById), new { id = post.Id }, postWithUsername);
        }


        // Get all posts with user information
        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                // In the GetPosts method
                var postsQuery = _context.Posts
                    .Include(p => p.User)
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new
                    {
                        p.Id,
                        p.Title,
                        p.ImagePath,
                        p.Caption,
                        p.CreatedAt,
                        User = new { p.User.Username, p.UserId } // Return the full User object with Username
                    });


                // Pagination logic
                var posts = await postsQuery
                    .Skip((page - 1) * pageSize) // Skip posts for previous pages
                    .Take(pageSize) // Take the number of posts for the current page
                    .ToListAsync();

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest("Error fetching posts: " + ex.Message);
            }
        }


        // Get a post by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPostById(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }
            return Ok(post);
        }

        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<object>>> GetCommentsByPostId(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            // Fetch comments with associated user information
            var comments = await _context.Comments
                .Where(c => c.PostId == id)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    c.CreatedAt,
                })
                .ToListAsync();

            return Ok(comments);
        }

        // Submit a Comment
        [HttpPost("{postId}/comment")]
        public async Task<IActionResult> SubmitComment(int postId, [FromBody] Comment commentDto)
        {
            if (commentDto == null || string.IsNullOrEmpty(commentDto.Content) || commentDto.UserId == 0)
            {
                return BadRequest(new { Errors = new[] { "Comment content, Post ID, and User ID cannot be empty." } });
            }

            var post = await _context.Posts.FindAsync(postId);
            var user = await _context.Users.FindAsync(commentDto.UserId);
            if (post == null || user == null)
            {
                return NotFound("Post or user not found.");
            }

            var comment = new Comment
            {
                Content = commentDto.Content,
                PostId = postId,
                UserId = commentDto.UserId,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            var notificationService = new NotificationService(_context);
            await notificationService.CreateCommentNotification(postId, commentDto.UserId, commentDto.Content);

            return Ok(new { comment.Id, comment.Content, comment.CreatedAt, Username = user.Username });
        }

        [HttpPost("{postId}/like")]
        public async Task<IActionResult> LikePost(int postId, [FromBody] LikeRequest likeRequest)
        {
            if (likeRequest == null || likeRequest.UserId <= 0)
            {
                return BadRequest("Invalid like data.");
            }

            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == likeRequest.UserId);

            if (existingLike != null)
            {
                _context.Likes.Remove(existingLike);
                await _context.SaveChangesAsync();

                var userLiked = await _context.Likes.AnyAsync(l => l.PostId == postId && l.UserId == likeRequest.UserId);
                return Ok(new { message = "Post unliked.", userLiked });
            }

            var newLike = new Like { PostId = postId, UserId = likeRequest.UserId };
            _context.Likes.Add(newLike);
            await _context.SaveChangesAsync();

            var notificationService = new NotificationService(_context);
            await notificationService.CreateLikeNotification(postId, likeRequest.UserId);

            var userLikedAfterLike = await _context.Likes.AnyAsync(l => l.PostId == postId && l.UserId == likeRequest.UserId);
            return Ok(new { message = "Post liked.", userLiked = userLikedAfterLike });
        }


        // Get likes for a specific post by ID
        [HttpGet("{id}/likes")]
        public async Task<ActionResult<object>> GetLikesByPostId(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            var likes = await _context.Likes
                .Where(l => l.PostId == id)
                .CountAsync(); // Assuming there's a Likes table and each Like is a row

            return Ok(new { totalLikes = likes });
        }

        // Delete a post by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class LikeRequest
    {
        public int UserId { get; set; }
    }
}
