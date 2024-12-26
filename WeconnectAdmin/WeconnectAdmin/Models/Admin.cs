using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.Models
{
    public class Admin
    {
        [Key]  // This designates the Username as the primary key
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
