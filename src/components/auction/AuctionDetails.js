import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuctionById } from '../../services/auction';
import BidComponent from './BidComponent';
import useAuth from '../../hooks/useAuth';
import DeleteAuction from './DeleteAuction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getAuctionById(id).then(data => {
      setAuction(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><Typography>Loading auction...</Typography></Box>;
  if (!auction) return <Alert severity="error">Auction not found.</Alert>;

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2, borderRadius: 4, background: 'linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)', color: '#fff' }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>{auction.title}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {auction.images && auction.images.map((img, i) => (
            <CardMedia key={i} component="img" image={img} alt="Auction" sx={{ width: 120, borderRadius: 2 }} />
          ))}
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>{auction.description}</Typography>
        <Typography variant="h6">Current Price: ${auction.currentPrice}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>Ends: {new Date(auction.endTime).toLocaleString()}</Typography>
        {user && auction.seller && (user._id === auction.seller._id || user.id === auction.seller._id) && (
          <Box sx={{ my: 2 }}>
            <Button component={Link} to={`/auctions/${auction._id}/edit`} variant="contained" color="secondary" sx={{ mr: 2 }}>Edit Auction</Button>
            <DeleteAuction />
          </Box>
        )}
        <BidComponent auction={auction} setAuction={setAuction} />
      </CardContent>
    </Card>
  );
};

export default AuctionDetails; 