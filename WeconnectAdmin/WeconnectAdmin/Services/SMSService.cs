using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using Twilio;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace WeconnectAdmin.Services
{
    public class SMSService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<SMSService> _logger;

        // Inject ILogger into the constructor
        public SMSService(IConfiguration configuration, ILogger<SMSService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public void SendOTP(string mobileNumber, string otp)
        {
            var accountSid = _configuration["Twilio:AccountSid"];
            var authToken = _configuration["Twilio:AuthToken"];
            var fromPhoneNumber = _configuration["Twilio:FromPhoneNumber"];

            // Initialize Twilio client
            TwilioClient.Init(accountSid, authToken);

            // Log the OTP sending attempt
            _logger.LogInformation($"Attempting to send OTP to {mobileNumber} using Twilio from {fromPhoneNumber}");

            try
            {
                // Send SMS with the provided OTP
                var message = MessageResource.Create(
                    body: $"Your OTP is {otp}. It will expire in 5 minutes.",
                    from: new PhoneNumber(fromPhoneNumber),
                    to: new PhoneNumber(mobileNumber)  // Mobile number should have the +91 prefix
                );

                // Log the successful message sending with the message SID
                _logger.LogInformation($"OTP sent to {mobileNumber} successfully. Message SID: {message.Sid}");
            }
            catch (Twilio.Exceptions.ApiException ex)
            {
                // Log specific Twilio API errors
                _logger.LogError(ex, "Twilio API error while sending OTP.");
                throw new Exception($"Failed to send OTP via Twilio: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Log unexpected errors
                _logger.LogError(ex, "Unexpected error while sending OTP.");
                throw new Exception($"Error sending OTP: {ex.Message}");
            }
        }

    }
}
