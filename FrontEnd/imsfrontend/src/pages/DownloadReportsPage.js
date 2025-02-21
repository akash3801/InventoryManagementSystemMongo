import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DownloadReportsPage = () => {
  const [items, setItems] = useState([]); // Inventory list
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/inventory/list");
      setItems(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching inventory", error);
      setError("Failed to fetch inventory. Please try again later.");
    }
  };

  const downloadReport = async () => {
    try {
      console.log("Downloading report");
      const response = await axios.get(
        "http://localhost:8080/inventory/downloadreport",
        {
          responseType: "blob", // Important for downloading files
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory_report.csv"); // or the appropriate file name and extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report", error);
    }
  };

  // Calculate the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Download Reports Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No inventory items found.
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.pid}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Download Button */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary"
          onClick={downloadReport}
          disabled={items.length === 0}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default DownloadReportsPage;
