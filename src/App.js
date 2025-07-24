import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Loading from "./components/common/Loading";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";

import AuctionList from "./components/auction/AuctionList";
import AuctionDetails from "./components/auction/AuctionDetails";
import CreateAuction from "./components/auction/CreateAuction";
import EditAuction from "./components/auction/EditAuction";
import DeleteAuction from "./components/auction/DeleteAuction";

import UserDashboard from "./components/dashboard/UserDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";

import SearchBar from "./components/search/SearchBar";
import FilterPanel from "./components/search/FilterPanel";

import "./styles/Home.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#18191a",
      paper: "#232526",
    },
  },
  typography: {
    fontFamily: "Segoe UI, Arial, sans-serif",
    fontWeightBold: 700,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
});

function Home() {
  const [featured, setFeatured] = React.useState([]);
  const [winners, setWinners] = React.useState([]);

  React.useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;
    fetch(`${baseUrl}/auctions`)
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 3)));

    fetch(`${baseUrl}/auctions/winners`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Winners API response:", data);
        setWinners(data);
      });
  }, []);

  const isArray = Array.isArray(winners);

  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to the Auction App!</h1>
      <p className="home-subtitle">
        Bid, win, and sell in real time. Explore our featured auctions below or
        browse all auctions.
      </p>

      <h2 className="section-heading">Featured Auctions</h2>
      <div className="auction-grid">
        {featured.length === 0 ? (
          <div>No featured auctions.</div>
        ) : (
          featured.map((a) => (
            <div className="auction-card" key={a._id}>
              {a.images?.[0] && (
                <img
                  src={a.images[0]}
                  alt="Auction"
                  className="auction-image"
                />
              )}
              <h3 className="auction-title">{a.title}</h3>
              <p className="auction-desc">{a.description?.slice(0, 100)}...</p>
              <p className="auction-price">Current Price: ${a.currentPrice}</p>
              <p className="auction-end">
                Ends: {new Date(a.endTime).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      <h2 className="section-heading">Recent Auction Winners</h2>
      <div className="winner-list">
        {!isArray || winners.length === 0 ? (
          <div>No winners yet.</div>
        ) : (
          <table className="winner-table">
            <thead>
              <tr>
                <th>Auction</th>
                <th>Winner</th>
                <th>Email</th>
                <th>Final Price</th>
                <th>Ended At</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w) => (
                <tr key={w.auctionId}>
                  <td>{w.auctionTitle}</td>
                  <td>{w.winner?.username}</td>
                  <td>{w.winner?.email}</td>
                  <td>${w.finalPrice}</td>
                  <td>{new Date(w.endTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function App() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SocketProvider>
          <Router>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/auctions"
                  element={
                    <>
                      <SearchBar onSearch={setSearch} />
                      <FilterPanel onFilter={setStatus} />
                      <AuctionList
                        key={search + status}
                        search={search}
                        status={status}
                      />
                    </>
                  }
                />
                <Route path="/auctions/create" element={<CreateAuction />} />
                <Route path="/auctions/:id" element={<AuctionDetails />} />
                <Route path="/auctions/:id/edit" element={<EditAuction />} />
                <Route
                  path="/auctions/:id/delete"
                  element={<DeleteAuction />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
