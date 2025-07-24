import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { createAuction } from '../../services/auction';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const CreateAuction = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [endTime, setEndTime] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endTimeISO = endTime ? new Date(endTime).toISOString() : '';
    const data = { title, description, startingPrice, endTime: endTimeISO, images };
    const res = await createAuction(data, token);
    if (res._id) {
      navigate(`/auctions/${res._id}`);
    } else {
      setError(res.message || 'Failed to create auction');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)', color: '#fff' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#fff', textAlign: 'center' }}>Create Auction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField type="text" label="Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} required fullWidth multiline rows={3} sx={{ mb: 2 }} />
          <TextField type="number" label="Starting Price" value={startingPrice} onChange={e => setStartingPrice(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField type="datetime-local" label="End Time" value={endTime} onChange={e => setEndTime(e.target.value)} required fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField type="text" label="Image URLs (comma separated)" value={images.join(',')} onChange={e => setImages(e.target.value.split(','))} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ fontWeight: 700, py: 1.2, borderRadius: 2, fontSize: 18, mt: 1 }}>Create Auction</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </Paper>
    </Box>
  );
};

export default CreateAuction; 