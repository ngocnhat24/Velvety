import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Divider } from "@mui/material";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Therapist", path: "/therapist-management" },
    { name: "Staff", path: "/staff-management" },
  ];

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
          Admin
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
    </Drawer>
  );
};

export default AdminSidebar;
