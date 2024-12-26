using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeconnectAdmin.Data;
using WeconnectAdmin.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace WeconnectAdmin.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Inject ApplicationDbContext through the constructor
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Dashhboard()
        {
            var model = new DashboardViewModel
            {
                TotalUsers = _context.Users.Count(),
                TotalPosts = _context.Posts.Count(),
                TotalStories = _context.Stories.Count(),
                TotalAdmins = _context.Admins.Count()
            };

            return View(model);
        }
        public IActionResult Index()
        {
            // Check if the admin is logged in
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("AdminUsername")))
            {
                return RedirectToAction("Login", "Home");  // Redirect to Admin Login if not logged in
            }

            // Create and pass the DashboardViewModel to the view
            var model = new DashboardViewModel
            {
                TotalUsers = _context.Users.Count(),
                TotalPosts = _context.Posts.Count(),
                TotalStories = _context.Stories.Count(),
                TotalAdmins = _context.Admins.Count()
            };

            return View(model);  // Pass the model to the view
        }


        // Admin Login (GET) - Display Login Form
        [HttpGet]
        public IActionResult Login()
        {
            return View();  // Return the Login view
        }

        // Admin Login (POST) - Authenticate and Log the Admin in
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password)
        {
            // Check if the username and password match any admin in the database
            var admin = await _context.Admins
                                      .FirstOrDefaultAsync(a => a.Username == username && a.Password == password);

            if (admin != null)
            {
                // Admin found, log the user in by storing session data
                HttpContext.Session.SetString("AdminUsername", admin.Username);
                return RedirectToAction("Index");  // Redirect to the dashboard
            }
            else
            {
                // Invalid credentials
                TempData["Error"] = "Invalid credentials.";
                return View();
            }
        }

        // Admin Dashboard (GET) - Only accessible if logged in
        [HttpGet]
        public IActionResult Dashboard()
        {
            // Ensure the user is logged in
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("AdminUsername")))
            {
                return RedirectToAction("Login", "Home");  // Redirect to Admin Login if not logged in
            }

            // Fetch all users from the database (example use case)
            var users = _context.Users.ToList();

            return View(users);  // Return the dashboard view with users list (or customize this further)
        }

        // Admin Logout (POST)
        [HttpPost]
        public IActionResult Logout()
        {
            // Remove the session and log out the user
            HttpContext.Session.Remove("AdminUsername");
            return RedirectToAction("Login", "Home");  // Redirect to Login page
        }

        // View Users (Admin Page)
        public IActionResult ViewUsers()
        {
            ViewData["ActivePage"] = "ViewUsers";
            var users = _context.Users.ToList();
            return View(users);  // Return the ViewUsers page with the users list
        }

        // View a single user's details
        public IActionResult ViewUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound();  // Return 404 if the user is not found
            }

            return View(user);  // Return the user details page
        }
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            // Fetch the user along with related data
            var user = await _context.Users
                .Include(u => u.FollowRequestsSent)
                .Include(u => u.FollowRequestsReceived)
                .Include(u => u.Stories)
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Comments) // Include Comments for each Post
                .Include(u => u.Posts)
                    .ThenInclude(p => p.Likes) // Include Likes for each Post
                .Include(u => u.Comments)
                .Include(u => u.Likes)
                .Include(u => u.SentMessages)
                .Include(u => u.ReceivedMessages)
                .Include(u => u.Notifications)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            // Remove dependencies in the UserUser table (followers and following)
            var followers = _context.Set<Dictionary<string, object>>("UserUser")
                .Where(x => EF.Property<int>(x, "FollowersId") == id || EF.Property<int>(x, "FollowingId") == id);
            _context.RemoveRange(followers);

            // Delete related entities manually
            foreach (var post in user.Posts)
            {
                // Remove related comments for the post
                _context.Comments.RemoveRange(post.Comments);

                // Remove related likes for the post
                _context.Likes.RemoveRange(post.Likes);
            }

            // Remove user's posts
            _context.Posts.RemoveRange(user.Posts);

            // Remove user's comments
            _context.Comments.RemoveRange(user.Comments);

            // Remove other related entities
            _context.FollowRequests.RemoveRange(user.FollowRequestsSent);
            _context.FollowRequests.RemoveRange(user.FollowRequestsReceived);
            _context.Stories.RemoveRange(user.Stories);
            _context.Likes.RemoveRange(user.Likes);
            _context.Messages.RemoveRange(user.SentMessages);
            _context.Messages.RemoveRange(user.ReceivedMessages);
            _context.Notifications.RemoveRange(user.Notifications);

            // Finally, remove the user
            _context.Users.Remove(user);

            // Save changes to the database
            await _context.SaveChangesAsync();

            return RedirectToAction("ViewUsers");
        }


        // View and List Posts on the Dashboard
        [HttpGet]
        [Route("ViewPost/{id:int}")] // Specify the route for the single post view
        public IActionResult ViewPost(int id)
        {
            var post = _context.Posts
                               .Include(p => p.User)
                               .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);  // Return the post details page
        }

        [HttpGet]
        [Route("ViewPost")] // Default route for viewing all posts
        public IActionResult ViewPost()
        {
            var posts = _context.Posts.Include(p => p.User).ToList();
            return View(posts);  // Return the list of posts page
        }


        [HttpPost]
        public IActionResult DeletePost(int id)
        {
            var post = _context.Posts
                .Include(p => p.Comments)  // Include related comments
                .Include(p => p.Likes)     // Include related likes (optional)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();  // Return 404 if post is not found
            }

            // Delete related comments
            foreach (var comment in post.Comments.ToList())
            {
                _context.Comments.Remove(comment);
            }

            // Delete related likes (if needed)
            foreach (var like in post.Likes.ToList())
            {
                _context.Likes.Remove(like);
            }

            // Now delete the post itself
            _context.Posts.Remove(post);
            _context.SaveChanges();  // Save changes to delete the post and its related data

            return RedirectToAction("ViewPost");  // Redirect to the list of posts
        }
        [HttpGet]
        [Route("ViewStory")] // Default route for viewing all stories
        public IActionResult ViewStories()
        {
            var stories = _context.Stories.Include(s => s.User).ToList();
            return View(stories);  // Return the list of stories page
        }

        // View a single story by id
        [HttpGet]
        [Route("ViewStory/{id:int}")]
        public IActionResult ViewStory(int id)
        {
            var story = _context.Stories
                .Include(s => s.User)
                .FirstOrDefault(s => s.Id == id);

            if (story == null)
            {
                return NotFound();
            }

            return View(story); // Return the single story view
        }

        // Delete a story
        // Delete a story
        [HttpPost]
        [Route("DeleteStory/{id:int}")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteStory(int id)
        {
            var story = _context.Stories
                .FirstOrDefault(s => s.Id == id);

            if (story == null)
            {
                return NotFound();
            }

            _context.Stories.Remove(story);
            _context.SaveChanges();

            return RedirectToAction("ViewStories"); // Redirect back to the stories list
        }

    }
}
