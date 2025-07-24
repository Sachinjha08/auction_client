import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const { user, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    upiId: user?.upiId || "",
    bankAccountNumber: user?.bankAccountNumber || "",
    ifscCode: user?.ifscCode || "",
    profile: {
      avatar: user?.profile?.avatar || "",
      bio: user?.profile?.bio || "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      setForm((f) => ({
        ...f,
        profile: { ...f.profile, [name.split(".")[1]]: value },
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setSuccess("Profile updated successfully!");
      setEditing(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
          background: "linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)",
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: 700, color: "#fff", textAlign: "center" }}
        >
          Profile
        </Typography>
        {!editing ? (
          <>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body1">
              <strong>Mobile:</strong> {user.mobile || "-"}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address || "-"}
            </Typography>
            <Typography variant="body1">
              <strong>UPI ID:</strong> {user.upiId || "-"}
            </Typography>
            <Typography variant="body1">
              <strong>Bank Account Number:</strong>{" "}
              {user.bankAccountNumber || "-"}
            </Typography>
            <Typography variant="body1">
              <strong>IFSC Code:</strong> {user.ifscCode || "-"}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <TextField
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="mobile"
              label="Mobile"
              value={form.mobile}
              onChange={handleChange}
              autoComplete="tel"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="address"
              label="Address"
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="upiId"
              label="UPI ID"
              value={form.upiId}
              onChange={handleChange}
              autoComplete="off"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="bankAccountNumber"
              label="Bank Account Number"
              value={form.bankAccountNumber}
              onChange={handleChange}
              autoComplete="off"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <TextField
              name="ifscCode"
              label="IFSC Code"
              value={form.ifscCode}
              onChange={handleChange}
              autoComplete="off"
              sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                fontWeight: 700,
                py: 1.2,
                borderRadius: 2,
                fontSize: 18,
                mt: 1,
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => setEditing(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
