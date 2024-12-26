using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WeconnectAdmin.Models;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using WeconnectAdmin.Data;
using Microsoft.EntityFrameworkCore;

namespace WeconnectAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Upload Story
        [HttpPost("upload")]
        public async Task<IActionResult> UploadStory([FromForm] IFormFile mediaFile, [FromForm] int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return BadRequest("Invalid User");

            if (mediaFile == null || mediaFile.Length == 0)
                return BadRequest("No file selected");

            var fileExtension = Path.GetExtension(mediaFile.FileName).ToLower();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".mp4", ".avi", ".mov" };
            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("Unsupported file type");

            var filePath = Path.Combine("uploads", Guid.NewGuid().ToString() + fileExtension);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await mediaFile.CopyToAsync(stream);
            }

            var story = new Story
            {
                UserId = userId,
                Username = user.Username,
                ImagePath = filePath, // Stores both image and video paths here
                UploadedAt = DateTime.UtcNow
            };

            _context.Stories.Add(story);
            await _context.SaveChangesAsync();

            return Ok(new { id = story.Id, username = user.Username, imagePath = story.ImagePath, uploadedAt = story.UploadedAt });
        }



        // Get all stories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Story>>> GetAllStories()
        {
            var stories = await _context.Stories.ToListAsync();
            return Ok(stories);
        }

        // Get a story by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Story>> GetStoryById(int id)
        {
            var story = await _context.Stories.FindAsync(id);
            if (story == null)
            {
                return NotFound("Story not found.");
            }
            return Ok(story);
        }

        // Delete a story by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStory(int id)
        {
            var story = await _context.Stories.FindAsync(id);
            if (story == null)
            {
                return NotFound("Story not found.");
            }

            _context.Stories.Remove(story);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content

        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Story>>> GetUserStories(int userId)
        {
            var stories = await _context.Stories.Where(s => s.UserId == userId).ToListAsync();
            return Ok(stories);
        }
    }
}
