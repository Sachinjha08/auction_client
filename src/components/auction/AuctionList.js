import React, { useEffect, useState } from "react";
import { getAuctions } from "../../services/auction";
import AuctionItem from "./AuctionItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const AuctionList = ({ search = "", status = "" }) => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = "?";
    if (search) query += `search=${encodeURIComponent(search)}&`;
    if (status) query += `status=${encodeURIComponent(status)}&`;
    if (query === "?") query = "";
    getAuctions(query).then((data) => {
      setAuctions(data);
      setLoading(false);
    });
  }, [search, status]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        Auctions
      </Typography>
      {auctions.length === 0 ? (
        <Alert severity="info">No auctions found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {auctions.map((auction) => (
            <Grid item xs={12} sm={6} md={4} key={auction._id}>
              <AuctionItem auction={auction} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AuctionList;
