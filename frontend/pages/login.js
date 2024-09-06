import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EmailOtpLogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // New state to manage loading
  const [error, setError] = useState(null); // New state to manage errors
  const router = useRouter();


  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const userId= localStorage.getItem('userId')
      setError(null); // Reset error before sending OTP
      const response = await axios.post('http://localhost:5000/api/send-otp', { userId });
      console.log('OTP sent successfully:', response.data);
      setOtpSent(true);
    } catch (error) {
      
      handleError(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Reset error before attempting login
      const response = await axios.post('http://localhost:5000/api/login', { email, otp });
      console.log('Login successful:', response.data);
      router.push('/');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setError(`Request failed with status ${error.response.status}: ${error.response.data.message}`);
    } else if (error.request) {
      setError('No response received from the server.');
    } else {
      setError(`Error: ${error.message}`);
    }
    console.error(error);
  };

  if (loading) return <p>Loading...</p>; // Display a loading message while fetching the email

  return (
    <form onSubmit={otpSent ? handleLogin : handleSendOtp}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <input
        type="email"
        value={email}
        readOnly
        placeholder="Email"
        required
      />
      {otpSent && (
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
      )}
      <button type="submit" disabled={loading}>
        {otpSent ? 'Login' : 'Send OTP'}
      </button>
    </form>
  );
}
