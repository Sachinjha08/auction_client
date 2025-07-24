import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x180?text=No+Image";

const AuctionItem = ({ auction }) => {
  const imageUrl = auction.images && auction.images.length > 0 ? auction.images[0] : FALLBACK_IMAGE;
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        background: "linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)",
        color: "#fff",
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={auction.title}
        sx={{ height: 180, width: '100%', objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12, minHeight: 180, maxHeight: 180 }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {auction.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: 48 }}
        >
          {auction.description}
        </Typography>
        <Typography variant="body1">
          Current Price: ${auction.currentPrice}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Ends: {new Date(auction.endTime).toLocaleString()}
        </Typography>
        <Button
          component={Link}
          to={`/auctions/${auction._id}`}
          variant="contained"
          color="secondary"
          sx={{ mt: 'auto' }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuctionItem; 