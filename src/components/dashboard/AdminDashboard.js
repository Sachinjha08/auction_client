import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";

const API_URL = process.env.REACT_APP_API_URL;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setUsers);
    fetch(`${API_URL}/auctions`)
      .then((res) => res.json())
      .then(setAuctions);
  }, [token]);

  const handleViewTransactions = async (userId) => {
    setSelectedUser(userId);
    setShowTransactions(true);
    const res = await fetch(`${API_URL}/users/${userId}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserTransactions(data.transactions || []);
  };

  const handleCloseTransactions = () => {
    setShowTransactions(false);
    setSelectedUser(null);
    setUserTransactions([]);
  };

  const handleDeleteUser = async () => {
    const userId = deleteDialog.userId;
    setError("");
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setUsers(users.filter((u) => u._id !== userId));
      setDeleteDialog({ open: false, userId: null });
    } else {
      setError("Failed to delete user");
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        background: "linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 3, color: "#fff", textAlign: "center" }}
      >
        Admin Panel
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Users
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer
        component={Paper}
        sx={{ mb: 4, background: "rgba(255,255,255,0.1)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Username</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Wallet Balance</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell sx={{ color: "#fff" }}>{u.username}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{u.role}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {u.wallet?.balance ?? 0}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={() =>
                      setDeleteDialog({ open: true, userId: u._id })
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleViewTransactions(u._id)}
                  >
                    View Transactions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, userId: null })}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, userId: null })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showTransactions}
        onClose={handleCloseTransactions}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#232526",
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>User Transactions</DialogTitle>
        <DialogContent>
          <List>
            {userTransactions.length === 0 && (
              <ListItem>
                <ListItemText
                  primary="No transactions yet."
                  primaryTypographyProps={{ sx: { color: "#fff" } }}
                />
              </ListItem>
            )}
            {userTransactions.map((t, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`${
                    t.date ? new Date(t.date).toLocaleString() : ""
                  } - ${t.type} - $${t.amount} - ${t.description}`}
                  primaryTypographyProps={{ sx: { color: "#fff" } }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransactions} sx={{ color: "#00bcd4" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, mt: 4 }}>
        Auctions
      </Typography>
      <List>
        {auctions.map((a) => (
          <ListItem key={a._id}>
            <ListItemText primary={`${a.title} ($${a.currentPrice})`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminDashboard;
