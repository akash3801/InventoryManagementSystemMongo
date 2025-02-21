import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";
import DownloadReportsPage from "./pages/DownloadReportsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./index.css";
import AddInventoryPage from "./pages/AddInventoryPage";
import ShowInventory from "./pages/ShowInventory";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [userRole, setUserRole] = useState(
    sessionStorage.getItem("role")?.toLowerCase()
  );

  useEffect(() => {
    const updateRole = () =>
      setUserRole(sessionStorage.getItem("role")?.toLowerCase());
    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Admin Routes */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <InventoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/additem"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddInventoryPage />
              </ProtectedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/downloadReports"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <DownloadReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showinventory"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <ShowInventory />
              </ProtectedRoute>
            }
          />

          {/* Accessible by Both Admin and Staff */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "staff"]}>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
