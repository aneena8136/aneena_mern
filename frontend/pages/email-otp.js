import { useState } from 'react';
import axios from 'axios';
import styles from './EmailOTPVerification.module.css'; // Import the CSS module

export default function EmailOTPVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState('send'); // 'send' or 'verify'
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/email-otp/send', { email });
      setStep('verify');
      setMessage(response.data.message);
    } catch (error) {
      console.error('Send OTP error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e) => {
    console.log(email,otp)
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/email-otp/verify', { email, otp });
      if (response.data.success) {
        alert('OTP verified successfully!');
        router.push('/aadhar'); 
        // Redirect to dashboard or appropriate page
      } else {
        setError(response.data.message || 'Failed to verify OTP');
        router.push('/aadhar'); 

      }
    } catch (error) {
      console.error('Verify OTP error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify OTP');
    }
  };

  return (
    <div className={styles.otpContainer}>
      <form onSubmit={step === 'send' ? handleSendOTP : handleVerifyOTP} className={styles.otpForm}>
        <h1>Email OTP Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {message && <p className={styles.successMessage}>{message}</p>}
        
        {step === 'send' && (
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.btn}>Send OTP</button>
          </div>
        )}

        {step === 'verify' && (
          <div className={styles.inputGroup}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <button type="submit" className={styles.btn}>Verify OTP</button>
          </div>
        )}
      </form>
    </div>
  );
}
