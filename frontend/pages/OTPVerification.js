import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './OTPVerification.module.css'; // Import CSS module

export default function OTPVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState('send'); // 'send' or 'verify'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/send-otp', { phoneNumber });
      setStep('verify');
    } catch (error) {
      console.error('Send OTP error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/verify-otp', { phoneNumber, otp });
      alert('OTP verified successfully!');
      router.push('/email-otp'); // Redirect to dashboard or appropriate page
    } catch (error) {
      console.error('Verify OTP error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify OTP');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={step === 'send' ? handleSendOTP : handleVerifyOTP} >
        <h1>OTP Verification</h1>
        {error && <p className={styles.error}>{error}</p>}
        
        {step === 'send' && (
          <div className={styles.stepContainer}>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="submit" className={styles.buttonOtp}>Send OTP</button>
          </div>
        )}

        {step === 'verify' && (
          <div className={styles.stepContainer}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <button type="submit" className={styles.buttonOtp}>Verify OTP</button>
          </div>
        )}
      </form>
    </div>
  );
}
