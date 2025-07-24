import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getAuctionById, updateAuction } from '../../services/auction';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const EditAuction = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [auction, setAuction] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAuctionById(id).then(setAuction);
  }, [id]);

  const handleChange = e => {
    setAuction({ ...auction, [e.target.name]: e.target.value });
  };

  function formatDateForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const { title, description, startingPrice, endTime, images } = auction;
    const updateData = { title, description, startingPrice, endTime, images };
    const res = await updateAuction(id, updateData, token);
    if (res._id) {
      navigate(`/auctions/${id}`);
    } else {
      setError(res.message || 'Update failed');
    }
  };

  if (!auction) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><Typography>Loading...</Typography></Box>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 4, background: 'linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)', color: '#fff' }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#fff', textAlign: 'center' }}>Edit Auction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="title" label="Title" value={auction.title} onChange={handleChange} required fullWidth sx={{ mb: 2 }} />
          <TextField name="description" label="Description" value={auction.description} onChange={handleChange} required fullWidth multiline rows={3} sx={{ mb: 2 }} />
          <TextField name="startingPrice" type="number" label="Starting Price" value={auction.startingPrice} onChange={handleChange} required fullWidth sx={{ mb: 2 }} />
          <TextField name="endTime" type="datetime-local" label="End Time" value={formatDateForInput(auction.endTime)} onChange={handleChange} required fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField name="images" label="Image URLs (comma separated)" value={auction.images.join(',')} onChange={e => setAuction({ ...auction, images: e.target.value.split(',') })} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ fontWeight: 700, py: 1.2, borderRadius: 2, fontSize: 18, mt: 1 }}>Update Auction</Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </Paper>
    </Box>
  );
};

export default EditAuction; 