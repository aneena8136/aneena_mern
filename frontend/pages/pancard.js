
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module

export default function PanVerification() {
  const [pan, setPan] = useState('');
  let [result, setResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyPan = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-pan', { pan });
      
      const result=response.data.result
      if(result.link_status == true){
        alert('PAN verified!');
        router.push('/gst'); 

      }
      else{
        alert('Invalid PAN !');
      }
      alert('Aadhaar verified successfully!');
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Aadhaar verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify Aadhaar');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyPan} className={styles.verificationForm}>
        <h1>Pan Card Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="aadhaar">Pan Number:</label>
          <input
            type="text"
            id="pan"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify Pan</button>
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

