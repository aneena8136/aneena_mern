
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module

export default function gstVerification() {
  const [gst, setGst] = useState('');
  let [result, setResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleVerifyGst = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-gst', { gst });
      
      const result=response.data.result.source_output
      if(result.gstin_status == "Active"){
        alert('GST verified!');
        router.push('/address'); 

      }
      else{
        alert('Invalid GST !');
      }
      alert('GST verified successfully!');
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('GST verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify GST');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyGst} className={styles.verificationForm}>
        <h1>GST Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="gst">Gst Number:</label>
          <input
            type="text"
            id="gst"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify Gst</button>
        </div>

        {/* {result && (
          <div className={styles.result}>
            <h2>Verification Result:</h2>
           
          </div>
        )} */}
      </form>
    </div>
  );
}

