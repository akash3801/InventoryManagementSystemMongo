import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddInventoryPage = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.quantity) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/inventory/add", newItem);
      alert("Item added successfully!");
      navigate("/inventory"); // Redirect to inventory page after adding
    } catch (error) {
      console.error("Error adding item", error);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Inventory Item</h2>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={newItem.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={newItem.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={newItem.quantity}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default AddInventoryPage;
