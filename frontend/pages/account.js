
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module

export default function bankVerification() {
  const [account,setAccount] = useState('');
  const[ifsc,setIfsc] = useState('');
  let [result, setResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleVerifyAccount = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify-account', { account,ifsc });
      
      const result=response.data.request_id
     getBankDetails(result)
      // else{
      //   alert('Invalid GST !');
      // }
      // alert('GST verified successfully!');
      
      // setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('GST verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify GST');
    }
  };

  const getBankDetails = async (i) => {
   const id=i

    try {
      const response = await axios.post('http://localhost:5000/api/get-account', { id });
      
      const result=response.data
      
      alert('Account verified successfully!');
      
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('GST verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify GST');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyAccount} className={styles.verificationForm}>
        <h1>Account Verification</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="account">Account Number:</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            className={styles.inputField}
          />
          <label htmlFor="ifsc">IFSC Number:</label>
          <input
            type="text"
            id="ifsc"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify</button>
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

