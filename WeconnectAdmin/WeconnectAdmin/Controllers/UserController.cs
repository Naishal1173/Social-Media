using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeconnectAdmin.Data;
using WeconnectAdmin.Models;
using WeconnectAdmin.DTO;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using WeconnectAdmin.Services;

namespace WeconnectAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly SMSService _smsService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserController> _logger;

        public UserController(ApplicationDbContext context, SMSService smsService, ILogger<UserController> logger, IConfiguration configuration)
        {
            _context = context;
            _smsService = smsService;
            _logger = logger;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterUserDTO request)
        {
            try
            {
                // Validate request
                if (request == null || string.IsNullOrEmpty(request.Email) || !new EmailAddressAttribute().IsValid(request.Email))
                {
                    return BadRequest("Invalid email format or empty request.");
                }

                if (string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest("Password is required.");
                }

                if (_context.Users.Any(u => u.Email == request.Email))
                {
                    return BadRequest("User already exists with this email.");
                }

                // Hash password
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

                // Generate a random 6-digit OTP before creating the user
                Random random = new Random();
                string otp = random.Next(100000, 999999).ToString();

                // Create user object
                var user = new User
                {
                    Username = request.Username,
                    Email = request.Email,
                    Password = hashedPassword,
                    MobileNumber = request.MobileNumber,
                    IsVerified = false,
                    OTP = otp  // Assign the generated OTP here
                };

                _context.Users.Add(user);
                _context.SaveChanges();  // Save the user in the database

                // Send OTP via Twilio service
                try
                {
                    // Assuming the mobile number passed is in the correct format (with country code)
                    _smsService.SendOTP(request.MobileNumber, otp);  // Send OTP to the mobile number using your Twilio service
                }
                catch (Twilio.Exceptions.ApiException ex)
                {
                    _logger.LogError(ex, "Twilio error occurred while sending OTP.");
                    return StatusCode(500, $"Failed to send OTP: {ex.Message}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Unexpected error while sending OTP.");
                    return StatusCode(500, $"Error sending OTP: {ex.Message}");
                }

                return Ok("User registered successfully. OTP has been sent.");
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Database error during registration.");
                return StatusCode(500, $"A database error occurred: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error during registration.");
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }


        [HttpPost("verify-otp")]
        public IActionResult VerifyOTP([FromBody] OTPRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrEmpty(request.MobileNumber) || string.IsNullOrEmpty(request.OTP))
                {
                    return BadRequest(new { message = "Mobile number and OTP are required." });
                }

                // Retrieve the latest unverified user record for this mobile number
                var user = _context.Users
                    .Where(u => u.MobileNumber == request.MobileNumber && !u.IsVerified)
                    .OrderByDescending(u => u.Id) // Assuming higher Id implies the latest record
                    .FirstOrDefault();

                if (user == null)
                {
                    _logger.LogWarning("No unverified user found for mobile number: " + request.MobileNumber);
                    return NotFound(new { message = "No unverified user found for this mobile number." });
                }

                if (user.OTP != request.OTP)
                {
                    _logger.LogWarning($"OTP mismatch. Expected: {user.OTP}, Received: {request.OTP}");
                    return BadRequest(new { message = "Invalid OTP." });
                }



                // Mark the user as verified
                user.IsVerified = true;

                _context.Users.Update(user);
                _context.SaveChanges();

                return Ok(new { message = "OTP verified successfully. Your account is now verified." });
            }
            catch (Exception ex)
            {
                // Log the error and return a generic error message
                _logger.LogError(ex, "Error occurred while verifying OTP.");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("login")]  // This should handle POST requests for /api/user/login
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Username and password are required.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Invalid username or password.");

            // Return user ID and username
            return Ok(new { userId = user.Id, username = user.Username });
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear any session data if you're using sessions
            HttpContext.Session.Clear();  // This clears the session data in case you're using session-based authentication
            // Return success response for logout
            return Ok(new { message = "Logged out successfully" });
        }

        // Get follow suggestions
        [HttpGet("follow-suggestions/{currentUserId}")]
        public IActionResult GetFollowSuggestions(int currentUserId)
        {
            // Check if the user exists
            var user = _context.Users.FirstOrDefault(u => u.Id == currentUserId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            // Fetch suggestions
            var suggestions = _context.Users
            .Where(u => u.Id != currentUserId && !u.Followers.Any(f => f.Id == currentUserId))
            .Select(u => new
            {
                Id = u.Id,
                Username = u.Username
            })
            .ToList();


            if (!suggestions.Any())
                return NotFound(new { message = "No follow suggestions found for the given user ID." });

            return Ok(suggestions);
        }

        // Get received follow requests
        [HttpGet("received-follow-requests/{userId}")]
        public async Task<IActionResult> GetReceivedFollowRequests(int userId)
        {
            try
            {
                var followRequests = await _context.FollowRequests
                    .Where(fr => fr.ReceiverId == userId)
                    .Include(fr => fr.Sender)
                    .Select(fr => new
                    {
                        Id = fr.Id,
                        SenderId = fr.SenderId,
                        SenderUsername = fr.Sender.Username
                    })
                    .ToListAsync();

                return Ok(new { followRequests });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching follow requests: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // Send follow request
        [HttpPost("send-follow-request")]
        public async Task<IActionResult> SendFollowRequest([FromBody] FollowRequestDto requestDto)
        {
            if (requestDto == null || requestDto.SenderId <= 0 || requestDto.ReceiverId <= 0)
                return BadRequest(new { message = "Invalid follow request data." });

            var sender = await _context.Users.FindAsync(requestDto.SenderId);
            var receiver = await _context.Users.FindAsync(requestDto.ReceiverId);

            if (sender == null || receiver == null)
                return NotFound(new { message = "User(s) not found." });

            var existingRequest = await _context.FollowRequests
                .AnyAsync(fr => fr.SenderId == requestDto.SenderId && fr.ReceiverId == requestDto.ReceiverId);

            if (existingRequest)
                return BadRequest(new { message = "Follow request already sent." });

            var followRequest = new FollowRequest
            {
                SenderId = requestDto.SenderId,
                ReceiverId = requestDto.ReceiverId,
                CreatedAt = DateTime.UtcNow
            };

            _context.FollowRequests.Add(followRequest);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Follow request sent successfully!" });
        }

        // Accept follow request
        [HttpPost("accept-follow-request/{requestId}")]
        public async Task<IActionResult> AcceptFollowRequest(int requestId)
        {
            // Fetch the follow request details
            var followRequest = await _context.FollowRequests
                .Include(fr => fr.Sender)
                .Include(fr => fr.Receiver)
                .FirstOrDefaultAsync(fr => fr.Id == requestId);

            if (followRequest == null)
                return NotFound("Follow request not found.");

            // Retrieve the follower and followee from the context
            var follower = await _context.Users
                .Include(u => u.Following)
                .FirstOrDefaultAsync(u => u.Id == followRequest.SenderId);

            var followee = await _context.Users
                .Include(u => u.Following)
                .FirstOrDefaultAsync(u => u.Id == followRequest.ReceiverId);

            if (follower == null || followee == null)
            {
                return NotFound("User not found.");
            }

            // Add the followee to the follower's following list
            if (!follower.Following.Any(f => f.Id == followee.Id))
            {
                follower.Following.Add(followee);
            }

            // Add the follower to the followee's followers list
            if (!followee.Following.Any(f => f.Id == follower.Id))
            {
                followee.Following.Add(follower);
            }

            // Remove the follow request
            _context.FollowRequests.Remove(followRequest);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return updated profile data
            var updatedUserProfile = new
            {
                Username = followee.Username,
                FollowersCount = followee.Followers.Count,
                FollowingCount = followee.Following.Count,
                PostsCount = followee.Posts.Count()
            };

            return Ok(new { message = "Follow request accepted.", updatedUserProfile });
        }


        // Decline follow request
        [HttpDelete("decline-follow-request/{requestId}")]
        public async Task<IActionResult> DeclineFollowRequest(int requestId)
        {
            var followRequest = await _context.FollowRequests.FindAsync(requestId);

            if (followRequest == null)
                return NotFound("Follow request not found.");

            _context.FollowRequests.Remove(followRequest);
            await _context.SaveChangesAsync();

            var updatedUserProfile = new
            {
                Username = followRequest.Receiver.Username,
                FollowersCount = followRequest.Receiver.Followers.Count,
                FollowingCount = followRequest.Receiver.Following.Count,
                PostsCount = followRequest.Receiver.Posts.Count()
            };

            return Ok(new { message = "Follow request declined.", updatedUserProfile });
        }

        // Get user profile
        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetUserProfile(int id)
        {
            var user = await _context.Users
                .Include(u => u.Followers)
                .Include(u => u.Following)
                .Include(u => u.Posts)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound();

            var userProfileDto = new
            {
                Username = user.Username,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Following.Count,
                PostsCount = user.Posts.Count()
            };

            return Ok(userProfileDto);
        }

        [HttpGet("{id}/followers")]
        public async Task<IActionResult> GetFollowers(int id)
        {
            // Fetch the user with their followers (excluding unnecessary properties)
            var user = await _context.Users
                .Include(u => u.Followers)
                .FirstOrDefaultAsync(u => u.Id == id);

            // If the user is not found, return a 404 status
            if (user == null)
                return NotFound();

            // Select only relevant follower data
            var followers = user.Followers.Select(f => new
            {
                f.Id,
                f.Username,  // Return username
            }).ToList();

            return Ok(followers);
        }


        // Get user by Id
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // Delete user
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Followers)
                .Include(u => u.Following)
                .Include(u => u.Posts)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound(new { message = "User not found." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
