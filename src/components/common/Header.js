import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { to: "/auctions", text: "Auctions", icon: <GavelIcon /> },
    user && {
      to: "/auctions/create",
      text: "Create",
      icon: <AddCircleIcon />,
    },
    user?.role === "admin" && {
      to: "/admin",
      text: "Admin",
      icon: <AdminPanelSettingsIcon />,
    },
    user && {
      to: "/dashboard",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    user && {
      to: "/profile",
      text: "Profile",
      icon: <PersonIcon />,
    },
    user
      ? {
          action: logout,
          text: "Logout",
          icon: <LogoutIcon />,
        }
      : {
          to: "/login",
          text: "Login",
          icon: <LoginIcon />,
        },
    !user && {
      to: "/register",
      text: "Register",
      icon: <AppRegistrationIcon />,
    },
  ].filter(Boolean); // remove false values

  return (
    <>
      <AppBar
        position="static"
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
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 2,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Auction App
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {menuItems.map((item, index) =>
                item.to ? (
                  <Button
                    key={index}
                    component={RouterLink}
                    to={item.to}
                    sx={{ color: "#fff" }}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    onClick={item.action}
                    sx={{ color: "#fff" }}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {menuItems.map((item, index) =>
              item.to ? (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={RouterLink} to={item.to}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={item.action}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
