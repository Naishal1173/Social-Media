import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth/register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    otp: '',
  });
  const [isOtpSent, setIsOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const { username, email, password, mobileNumber } = formData;

      // Validate mobile number format
      const mobileNumberPattern = /^\d{10}$/;
      if (!mobileNumberPattern.test(mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // Register the user
      const response = await axios.post(
        'http://localhost:5053/api/User/register',
        {
          username,
          email,
          password,
          mobileNumber: `+91${mobileNumber}`, // Assuming country code for India
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      alert(response.data || 'Registration successful. OTP sent to your mobile.');
      setIsOtpSent(true);
    } catch (err) {
      const errorMessage = err.response?.data || 'Registration failed. Please try again.';
      alert(errorMessage);
      console.error('Registration Error:', errorMessage);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const { mobileNumber, otp } = formData;

      if (!otp) {
        alert('Please enter the OTP.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5053/api/User/verify-otp',
        {
          mobileNumber: `+91${mobileNumber}`,
          OTP: otp,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      alert(response.data.message || 'OTP verified successfully.');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed.';
      alert(errorMessage);
      console.error('OTP Verification Error:', errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-left-content">
          <img src="../assets/images/login/1.jpg" className="signin-img" alt="Welcome" />
          <h2 className="slide-title">Power UP Your Friendship</h2>
          <p className="slide-description">
            Connect with the world and grow your network like never before.
          </p>
        </div>
      </div>
      <div className="register-right">
        <div className="form-container" style={{ paddingLeft: '50px' }}>
          <div className="brand-logo">
            <div className="logo-icon">W</div>
            <span className="logo-text">WeConnect</span>
          </div>
          <p
    className="s-3 font-size-16"
    style={{
        fontSize: '15px',
        color: '#555',
        paddingLeft: '80px',
        paddingTop: '10px'  // Add paddingTop to the inline style
    }}
>
    Welcome to WeConnect
</p>

          <br />
          <form>
            <div className="input-group">
              <h6 className="form-data fw-bold">Your Full Name</h6>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
                placeholder="Username"
              />
            </div>
            <div className="input-group">
              <h6 className="form-data fw-bold">Email Address</h6>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Email"
              />
            </div>
            <div className="input-group">
              <h6 className="form-data fw-bold">Your Password</h6>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Password"
              />
            </div>
            <div className="input-group">
              <h6 className="form-data fw-bold">Your Mobile Number</h6>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="input-field"
                placeholder="Mobile Number"
              />
            </div>
            {isOtpSent && (
              <div className="input-group">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="OTP"
                />
              </div>
            )}
            {!isOtpSent ? (
              <button type="button" className="send-otp-btn" onClick={handleRegister}>
                Send OTP
              </button>
            ) : (
              <button type="button" className="register-btn" onClick={handleVerifyOTP}>
                Verify OTP
              </button>
            )}
          </form>
          <div className="login-redirect">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
