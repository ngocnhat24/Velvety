import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import Sidebar from "../../components/ManagerSidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../../utils/axiosInstance";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all"); // Thêm trạng thái filter
  const [stats, setStats] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [selectedDate, setSelectedDate] = useState({
    day: moment().format("YYYY-MM-DD"),
    month: moment().month() + 1, // 1-12
    year: moment().year(),
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    let filteredOrders = [...orders];

    // Lọc theo trạng thái nếu có lựa chọn
    if (statusFilter !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter
      );
    }

    if (filter === "day") {
      // Lọc theo ngày
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).isSame(moment(selectedDate.day), "day");
      });
    } else if (filter === "month") {
      // Lọc theo tháng
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).month() + 1 === selectedDate.month &&
          moment(order.transactionDateTime).year() === selectedDate.year;
      });
    } else if (filter === "year") {
      // Lọc theo năm
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).year() === selectedDate.year;
      });
    }

    // Tính toán thống kê
    const newStats = {};
    let revenueSum = 0;
    let orderCount = 0;

    filteredOrders.forEach((order) => {
      const revenue = order.amount || 0;
      revenueSum += revenue;
      orderCount += 1;

      const orderDate = moment(order.transactionDateTime);
      const month = orderDate.month() + 1;
      if (!newStats[month]) {
        newStats[month] = { revenue: 0, count: 0 };
      }
      newStats[month].revenue += revenue;
      newStats[month].count += 1;
    });

    setStats(newStats);
    setTotalRevenue(revenueSum);
    setTotalOrders(orderCount);
  }, [orders, filter, selectedDate, statusFilter]); // Thêm statusFilter vào dependencies

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>

        {/* Bộ lọc */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <TextField
              select
              label="Filter By"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </TextField>
          </Grid>

          {/* Bộ lọc theo ngày, tháng, năm */}
          {filter === "day" && (
            <Grid item xs={4}>
              <TextField
                label="Select Date"
                type="date"
                value={selectedDate.day}
                onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          )}

          {filter === "month" && (
            <Grid item xs={4}>
              <TextField
                select
                label="Select Month"
                value={selectedDate.month}
                onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })}
                fullWidth
              >
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {filter === "year" && (
            <Grid item xs={4}>
              <TextField
                select
                label="Select Year"
                value={selectedDate.year}
                onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })}
                fullWidth
              >
                {[2023, 2024, 2025].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {/* Bộ lọc theo trạng thái */}
          <Grid item xs={4}>
            <TextField
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Tổng quan nhanh */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h5" color="primary">
                  {totalRevenue.toLocaleString()} VND
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h5" color="secondary">
                  {totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Biểu đồ doanh thu và đơn hàng với filter status */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Revenue
                </Typography>
                <Bar
                  data={{
                    labels: Object.keys(stats).map((m) => {
                      const monthNames = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ];
                      return monthNames[m - 1];
                    }),
                    datasets: [
                      {
                        label: "Revenue (VND)",
                        data: Object.values(stats).map((s) => s.revenue),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Total Orders
                </Typography>
                <Bar
                  data={{
                    labels: Object.keys(stats).map((m) => {
                      const monthNames = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ];
                      return monthNames[m - 1];
                    }),
                    datasets: [
                      {
                        label: "Total Orders",
                        data: Object.values(stats).map((s) => s.count),
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
