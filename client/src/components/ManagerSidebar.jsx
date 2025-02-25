import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Divider, Button } from "@mui/material";
import axios from "axios";

const ManagerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Services", path: "/service-management" },
    { name: "Blogs", path: "/blog-management" },
    { name: "Questions", path: "/question-management" },
  ];  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    axios.post("/api/auth/logout")
      .then(() => {
        // ✅ Clear auth data from storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("roleName");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("roleName");

        // ✅ Redirect user to login page
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
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#1a202c",
          color: "white",
          padding: "10px",
        },
      }}
    >
      {/* Thanh tiêu đề */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
          Manager
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: "gray" }} />

      {/* Danh sách menu */}
      <List>
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton selected={location.pathname === item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          backgroundColor: "#f44336",
          color: "white",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        }}
      >
        Logout
      </Button>
    </Drawer>
  );
};

export default ManagerSidebar;
