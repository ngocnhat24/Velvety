import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Divider, Button, Box } from "@mui/material";
import axios from "axios";

const CustomerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || sessionStorage.getItem("fullName");

  const menuItems = [
    { name: "Account Details", path: "/customer-profile" },
    { name: "Booking History", path: "/booking-history" },
  ];

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    axios.post("/api/auth/logout")
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("roleName");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("roleName");
        navigate("/login");
      })
      .catch(error => {
        console.error("Logout failed:", error.response?.data?.message || error.message);
      });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          backgroundColor: "#f9faef",
          color: "#c86c79",
          padding: "10px",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundImage: `url(https://www.pngplay.com/wp-content/uploads/7/Customer-Logo-Transparent-File.png)`,
            backgroundSize: "cover",
            borderRadius: "50%",
            marginBottom: 2,
          }}
        />
        <Typography variant="h6" sx={{ color: "#c86c79", textAlign: "center" }}>
          Welcome <br></br>{fullName}
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: "#E27585" }} />

      <List>
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton selected={location.pathname === item.path} sx={{ "&.Mui-selected": { backgroundColor: "#E27585", color: "white" } }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      
      <Button
        onClick={handleLogout}
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          backgroundColor: "#E27585",
          color: "white",
          "&:hover": {
            backgroundColor: "#a85663",
          },
          fontSize: "14px",
        }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default CustomerSidebar;
