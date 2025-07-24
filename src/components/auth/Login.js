import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
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
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          background: "linear-gradient(135deg, #00bcd4 0%, #0056b3 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <LoginIcon sx={{ fontSize: 40, color: "#fff", mr: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2, background: "rgba(255,255,255,0.1)", borderRadius: 1 }}
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <TextField
            type="password"
            label="Password"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2, background: "rgba(255,255,255,0.1)", borderRadius: 1 }}
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              fontWeight: 700,
              py: 1.2,
              borderRadius: 2,
              fontSize: 18,
              mt: 1,
            }}
          >
            Login
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
