package com.example.inventory.service;

import java.util.List;

import com.example.inventory.entity.Inventory;

public interface InventoryService {
	
	public Inventory addItem(Inventory item);

	public List<Inventory> getAllItems();
	
	public Inventory deleteItem(String id);
	
	public Inventory updateItem(String id, Inventory item);
	
	public String generateInventoryReport();
	
}
