import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { placeBid, getBidsForAuction } from '../../services/bid';
import useSocket from '../../hooks/useSocket';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const BidComponent = ({ auction, setAuction }) => {
  const { user, token } = useAuth();
  const socket = useSocket();
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBidsForAuction(auction._id).then(setBids);
    if (socket) {
      socket.emit('joinAuction', auction._id);
      socket.on('bidUpdate', (data) => {
        if (data.auctionId === auction._id) {
          setBids((prev) => [data.bid, ...prev]);
          setAuction((prev) => ({ ...prev, currentPrice: data.bid.amount }));
        }
      });
      return () => {
        socket.emit('leaveAuction', auction._id);
        socket.off('bidUpdate');
      };
    }
  }, [auction._id, socket, setAuction]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!user) return setError('Login to bid');
    const res = await placeBid(auction._id, Number(amount), token);
    if (res._id) {
      setAmount('');
      setError('');
    } else {
      setError(res.message || 'Bid failed');
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mt: 3, borderRadius: 3, background: 'rgba(0,0,0,0.15)' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Bids</Typography>
      <Box component="form" onSubmit={handleBid} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          type="number"
          label="Your bid"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={auction.currentPrice + 1}
          required
          sx={{ flex: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>Place Bid</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <List>
        {bids.map(bid => (
          <ListItem key={bid._id} sx={{ color: '#fff' }}>
            <ListItemText primary={`${bid.bidder?.username || 'User'}: $${bid.amount}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BidComponent; 