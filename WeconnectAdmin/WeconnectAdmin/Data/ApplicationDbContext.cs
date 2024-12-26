using Microsoft.EntityFrameworkCore;
using WeconnectAdmin.Models;

namespace WeconnectAdmin.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Define the DbSets (tables) for your models
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<FollowRequest> FollowRequests { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Admin> Admins { get; set; }

        // Constructor to pass options to the base class
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Configure relationships and database schema
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Define the User-Post relationship with cascade delete
            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Define the Post-Comment relationship with restrict delete
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne()
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Restrict);  // Use Restrict to prevent cascade delete here

            // Define the User-Comment relationship with cascade delete
            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete when User is deleted

            // Define the User-Like relationship with restrict delete
            modelBuilder.Entity<User>()
                .HasMany(u => u.Likes)
                .WithOne(l => l.User)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Changed to Restrict to prevent cascade delete

            // Define the User-Story relationship with cascade delete
            modelBuilder.Entity<User>()
                .HasMany(u => u.Stories)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FollowRequest>()
                .HasOne(fr => fr.Sender)
                .WithMany(u => u.FollowRequestsSent)
                .HasForeignKey(fr => fr.SenderId)
                .OnDelete(DeleteBehavior.Restrict);  // Prevent cascade delete for SenderId

            // Configure the FollowRequest-Receiver relationship with Restrict (no cascading delete)
            modelBuilder.Entity<FollowRequest>()
                .HasOne(fr => fr.Receiver)
                .WithMany(u => u.FollowRequestsReceived)
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // Chat-User many-to-many relationship
            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Users)
                .WithMany(u => u.Chats)
                .UsingEntity(j => j.ToTable("ChatUsers"));

            // Define the User-Notification relationship
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Use Restrict to avoid cascade delete

            // Define the Admin model's primary key
            modelBuilder.Entity<Admin>()
                .HasKey(a => a.Username);

            // Configure self-referencing many-to-many relationship for followers and following
            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithMany(u => u.Following)
                .UsingEntity<Dictionary<string, object>>(
                    "UserUser", // Table name
                    r => r.HasOne<User>().WithMany().HasForeignKey("FollowersId").OnDelete(DeleteBehavior.Cascade),
                    l => l.HasOne<User>().WithMany().HasForeignKey("FollowingId"),
                    je =>
                    {
                        je.HasKey("FollowersId", "FollowingId"); // Composite Key
                        je.ToTable("UserUser"); // Explicit table name
                    });
        }
    }
}
