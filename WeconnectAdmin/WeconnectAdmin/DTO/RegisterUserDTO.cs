using System.ComponentModel.DataAnnotations;

namespace WeconnectAdmin.DTO
{
    public class RegisterUserDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public string MobileNumber { get; set; }
    }

}
