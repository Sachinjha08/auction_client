import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(username, email, password, mobile, address, upiId, bankAccountNumber, ifscCode);
    if (res.message === 'User registered successfully') {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)', color: '#fff' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#fff', textAlign: 'center' }}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField type="text" label="Username" value={username} onChange={e => setUsername(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="text" label="Mobile" value={mobile} onChange={e => setMobile(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="text" label="Address" value={address} onChange={e => setAddress(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="text" label="UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField type="text" label="Bank Account Number" value={bankAccountNumber} onChange={e => setBankAccountNumber(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <TextField type="text" label="IFSC Code" value={ifscCode} onChange={e => setIfscCode(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ fontWeight: 700, py: 1.2, borderRadius: 2, fontSize: 18, mt: 1 }}>Register</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>Registration successful! Redirecting...</Alert>}
        </form>
      </Paper>
    </Box>
  );
};

export default Register; 