import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module


export default function AadhaarVerification() {
  const [aadhaar, setAadhaar] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleVerifyAadhaar = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-aadhaar', { aadhaar });
      
      alert('Aadhaar verified successfully!');
      router.push('/pancard');
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Aadhaar verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify Aadhaar');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyAadhaar} className={styles.verificationForm}>
        <h1>Aadhaar Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="aadhaar">Aadhaar Number:</label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify Aadhaar</button>
        </div>

        {result && (
          <div className={styles.result}>
            <h2>Verification Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </form>
    </div>
  );
}