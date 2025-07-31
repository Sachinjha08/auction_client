import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const API_URL = process.env.REACT_APP_API_URL;

const UserDashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/users/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setData);
    fetch(`${API_URL}/users/wallet`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setWallet);
    fetch(`${API_URL}/users/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []));
  }, [token]);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    if (!addAmount || isNaN(addAmount) || Number(addAmount) <= 0) return;
    setLoading(true);
    await fetch(`${API_URL}/users/wallet/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Number(addAmount) }),
    });
    setAddAmount("");
    setLoading(false);
    fetch(`${API_URL}/users/wallet`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setWallet);
    fetch(`${API_URL}/users/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []));
  };

  const handleWithdrawFunds = async (e) => {
    e.preventDefault();
    setWithdrawError("");
    if (!withdrawAmount || isNaN(withdrawAmount) || Number(withdrawAmount) <= 0)
      return;
    if (Number(withdrawAmount) > wallet.balance) {
      setWithdrawError("Insufficient wallet balance");
      return;
    }
    setLoading(true);
    const res = await fetch(`${API_URL}/users/wallet/withdraw`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Number(withdrawAmount) }),
    });
    if (res.status === 400) {
      const data = await res.json();
      setWithdrawError(data.message || "Withdraw failed");
      setLoading(false);
      return;
    }
    setWithdrawAmount("");
    setLoading(false);
    fetch(`${API_URL}/users/wallet`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setWallet);
    fetch(`${API_URL}/users/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []));
  };

  if (!data)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography>Loading dashboard...</Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 900,
          width: "100%",
          borderRadius: 4,
          background: "linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, color: "#fff", textAlign: "center" }}
        >
          User Dashboard
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Wallet
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Balance: ${wallet.balance}
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddFunds}
            sx={{ display: "flex", gap: 2, mb: 2 }}
          >
            <TextField
              type="number"
              min="1"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Amount to add"
              disabled={loading}
              sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading || !addAmount}
            >
              Add Funds
            </Button>
          </Box>
          <Box
            component="form"
            onSubmit={handleWithdrawFunds}
            sx={{ display: "flex", gap: 2, mb: 2 }}
          >
            <TextField
              type="number"
              min="1"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount to withdraw"
              disabled={loading}
              sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading || !withdrawAmount}
            >
              Withdraw Funds
            </Button>
          </Box>
          {withdrawError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {withdrawError}
            </Alert>
          )}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Transaction History
          </Typography>
          <Box
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 2,
              p: 1,
              mt: 1,
            }}
          >
            <List dense>
              {transactions.length === 0 ? (
                <ListItem>
                  <ListItemText
                    primary="No transactions yet."
                    sx={{ color: "#fff" }}
                  />
                </ListItem>
              ) : (
                transactions.map((t, i) => (
                  <ListItem key={i} divider>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#fff",
                            }}
                          >
                            {t.date ? new Date(t.date).toLocaleString() : ""} –{" "}
                            {t.type} – ${t.amount}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: "#e0f7fa" }}>
                            {t.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Your Auctions
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ mb: 4, background: "rgba(255,255,255,0.1)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                <TableCell sx={{ color: "#fff" }}>Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data.auctions || []).map((a) => (
                <TableRow key={a._id}>
                  <TableCell sx={{ color: "#fff" }}>{a.title}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    ${a.currentPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Your Bids
        </Typography>
        <List>
          {(data.bids || []).map((b) => (
            <ListItem key={b._id}>
              <ListItemText
                primary={`${b.auction?.title || "Auction"}: $${b.amount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UserDashboard;
