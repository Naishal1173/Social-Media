using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WeconnectAdmin.Data;
using WeconnectAdmin.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddLogging();

// Add DbContext for database connection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add SMSService for OTP functionality
builder.Services.AddScoped<SMSService>();

// Add services for controllers with custom JSON settings
builder.Services.AddControllersWithViews() // Add this line for MVC support
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

// Configure CORS policy to allow all origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", corsBuilder =>
    {
        corsBuilder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
    });
});

// Add Swagger for API documentation
builder.Services.AddSwaggerGen();

// Register Logger service
builder.Services.AddSingleton<ILogger, Logger<Program>>();

// Add session services with custom timeout
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Set the session timeout
});

// Build the app
var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowAllOrigins");

// Enable Swagger in Development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger
    app.UseSwaggerUI(); // Enable Swagger UI
}

// Serve static files from the default wwwroot folder
app.UseStaticFiles(); // Ensure this is in place to serve from the wwwroot folder

// Serve static files from the 'uploads' directory
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "uploads")), // Ensure the path is correct
    RequestPath = "/uploads" // Path to access uploaded files
});

// Enable Developer Exception Page for detailed error logs in development
app.UseDeveloperExceptionPage();

// Enable HTTPS Redirection
app.UseHttpsRedirection();

// Enable session handling
app.UseSession(); // Add this line to enable session handling

// Set up routing and authentication
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Add custom route for HomeController
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Login}/{id?}");
});


// Map controllers for API
app.MapControllers();

// Run the application
app.Run();
