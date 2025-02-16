import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 800, 1500, 2200, 1700],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <Bar data={data} options={options} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
