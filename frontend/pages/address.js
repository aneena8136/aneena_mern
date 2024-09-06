
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './AadhaarVerification.module.css'; // Import the CSS module

export default function AddressrVerification() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleVerifyAddress = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
        console.log(address)
      const response = await axios.post('http://localhost:5000/api/verify-address', { address });
      

     
  
     
     
        const data = response.data.data[0];
        console.log(data);
        if (data && data.Status === "Success") {
            alert('Address fetched successfully!');
            setResult('Ok')
          const postOffices = data.PostOffice;

          if (postOffices && postOffices.length > 0) {
            setCity(postOffices[0].Name);
            setDistrict(postOffices[0].District);
            setState(postOffices[0].State);
          } else {
            setMessage('No PostOffice data found.');
          }
        } else {
          setMessage('No data or unsuccessful status.');
        }
      
    //   setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(' verification error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to verify ');
    }
  };

  return (
    <div className={styles.verificationContainer}>
      <form onSubmit={handleVerifyAddress} className={styles.verificationForm}>
        <h1>Address Lookup</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label htmlFor="pincode">Pin Number:</label>
          <input
            type="text"
            id="pincode"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.btn}>Verify Address</button>
        </div>

        {result && (
          <div className={styles.result}>
            <h2>Verification Result:</h2>
           
            <h3>City: {city}</h3>
            <h3>District: {district}</h3>
            <h3>State: {state}</h3>
           
          </div>
        )}
      </form>
    </div>
  );
}

