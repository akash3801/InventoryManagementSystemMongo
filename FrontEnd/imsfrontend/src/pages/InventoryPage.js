import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryPage = () => {
  const [items, setItems] = useState([]); // Inventory list
  const [editItem, setEditItem] = useState(null);
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
      console.log(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching inventory", error);
      setError("Failed to fetch inventory. Please try again later.");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!id) {
      console.error("Invalid item ID");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/inventory/delete/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
  };

  const handleUpdateItem = async () => {
    if (!editItem || !editItem.id) {
      console.error("Invalid item to update");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/inventory/update/${editItem.id}`,
        editItem
      );
      setEditItem(null);
      fetchInventory();
    } catch (error) {
      console.error("Error updating item", error);
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
      <h2 className="text-center mb-4">Inventory Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Inventory Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No inventory items found.
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
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

      {/* Edit Item Form */}
      {editItem && (
        <div className="card p-3 mt-4">
          <h4>Edit Item</h4>
          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Price</label>
              <input
                className="form-control"
                name="price"
                value={editItem.price}
                onChange={(e) =>
                  setEditItem({ ...editItem, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Quantity</label>
              <input
                className="form-control"
                name="quantity"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({ ...editItem, quantity: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-success me-2"
                onClick={handleUpdateItem}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
