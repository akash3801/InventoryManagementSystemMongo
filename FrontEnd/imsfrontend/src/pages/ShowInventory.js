import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const ShowInventory = () => {
  const [items, setItems] = useState([]); // Inventory list
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

  const updateQuantity = async (item, quantityChange) => {
    const updatedItem = { ...item, quantity: item.quantity + quantityChange };
    try {
      await axios.put(
        `http://localhost:8080/inventory/update/${item.id}`,
        updatedItem
      );
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? updatedItem : i))
      );
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Update Inventory</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Update Quantity</th>
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
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateQuantity(item, 1)}
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateQuantity(item, -1)}
                      disabled={item.quantity <= 0}
                    >
                      <FaMinus />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowInventory;
