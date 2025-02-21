import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HomePage = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: sessionStorage.getItem("authToken") !== null,
    userRole: sessionStorage.getItem("role")?.toLowerCase(),
    userName: sessionStorage.getItem("username"),
  });

  const [inventoryData, setInventoryData] = useState([]);

  // Fetch inventory data
  useEffect(() => {
    if (authState.isLoggedIn) {
      axios
        .get("http://localhost:8080/inventory/list")
        .then((response) => {
          setInventoryData(
            response.data.map((item, index) => ({
              name: item.name,
              quantity: parseInt(item.quantity, 10),
              price: parseFloat(item.price),
              totalValue: parseFloat(item.quantity) * parseFloat(item.price), // Total value for visualization
              id: index + 1, // Adding serial number
            }))
          );
        })
        .catch((error) => console.error("Error fetching inventory data:", error));
    }
  }, [authState.isLoggedIn]);

  return (
    <div>
      {authState.isLoggedIn ? (
        <>
          <h1>
            Welcome{" "}
            {authState.userName ? <strong>{authState.userName}</strong> : "User"}{" "}
            ({authState.userRole === "admin" ? "Admin" : "Staff"})
          </h1>

          <h2>Inventory Overview</h2>
          {inventoryData.length > 0 ? (
            <ResponsiveContainer width="80%" height={400}>
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Bar Chart for Quantity */}
                <Bar dataKey="quantity" barSize={40} fill="rgba(33, 150, 243, 0.8)" name="Quantity" />
                {/* Bar Chart for Price */}
                <Bar dataKey="price" barSize={40} fill="rgba(244, 67, 54, 0.8)" name="Price" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading inventory data...</p>
          )}
        </>
      ) : (
        <h1>Welcome to the Inventory Management System</h1>
      )}
    </div>
  );
};

export default HomePage;
