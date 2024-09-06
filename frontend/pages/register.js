import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Register.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
       dateOfBirth
       
      }); 
      const userId=response.data.userId;
      localStorage.setItem('userId',userId)
      alert('Registration successful!');
      // In your Register component
router.push('/OTPVerification');
    } catch (error) {
      console.error('Registration error:', error.response || error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
       
        

        <div className={styles.inputGroup}>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        
        
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
  );
}