import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from "chart.js";
import "./AdminDashboard.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 150,
    sellers: 50,
    soldProducts: 500,
    orderedProducts: 350,
  });

  useEffect(() => {
    // Fetch dashboard statistics from backend
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Dummy Data for Charts
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users Joined",
        data: [10, 25, 40, 60, 80, 100],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const sellerGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sellers Joined",
        data: [5, 10, 15, 20, 30, 50],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const soldProductsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Products Sold",
        data: [50, 70, 90, 120, 150, 200],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const orderedProductsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders Placed",
        data: [30, 50, 75, 100, 200, 300],
        borderColor: "rgba(255, 159, 64, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <AdminNavbar />
      <div className="dashboard-container">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Manage users, products, and orders here.</p>

        {/* Display Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sellers</h3>
            <p>{stats.sellers}</p>
          </div>
          <div className="stat-card">
            <h3>Sold Products</h3>
            <p>{stats.soldProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Ordered Products</h3>
            <p>{stats.orderedProducts}</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="charts-container">
          <div className="chart">
            <h3>User Growth</h3>
            <Bar data={userGrowthData} />
          </div>

          <div className="chart">
            <h3>Seller Growth</h3>
            <Bar data={sellerGrowthData} />
          </div>

          <div className="chart">
            <h3>Products Sold Over Time</h3>
            <Line data={soldProductsData} />
          </div>

          <div className="chart">
            <h3>Orders Placed Monthly</h3>
            <Line data={orderedProductsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
