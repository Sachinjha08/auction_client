import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        mb: 3,
        background: "linear-gradient(90deg, #00bcd4 0%, #0056b3 100%)",
      }}
    >
      <Toolbar>
        <IconButton
          component={RouterLink}
          to="/"
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 2 }}
        >
          Auction App
        </Typography>
        <Button
          component={RouterLink}
          to="/auctions"
          sx={{ color: "#fff" }}
          startIcon={<GavelIcon />}
        >
          Auctions
        </Button>

        {user && (
          <Button
            component={RouterLink}
            to="/auctions/create"
            sx={{ color: "#fff" }}
            startIcon={<AddCircleIcon />}
          >
            Create
          </Button>
        )}
        {user && user.role === "admin" && (
          <Button
            component={RouterLink}
            to="/admin"
            sx={{ color: "#fff" }}
            startIcon={<AdminPanelSettingsIcon />}
          >
            Admin
          </Button>
        )}
        {user && (
          <Button
            component={RouterLink}
            to="/dashboard"
            sx={{ color: "#fff" }}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
        )}
        {user && (
          <Button
            component={RouterLink}
            to="/profile"
            sx={{ color: "#fff" }}
            startIcon={<PersonIcon />}
          >
            Profile
          </Button>
        )}
        {user && (
          <Button
            onClick={logout}
            sx={{ color: "#fff" }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        )}
        {!user && (
          <Button
            component={RouterLink}
            to="/login"
            sx={{ color: "#fff" }}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        )}
        {!user && (
          <Button
            component={RouterLink}
            to="/register"
            sx={{ color: "#fff" }}
            startIcon={<AppRegistrationIcon />}
          >
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
