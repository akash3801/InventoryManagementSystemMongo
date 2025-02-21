package com.example.inventory.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "inventory") // Specifies the MongoDB collection
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Inventory {

    @Id // This annotation tells MongoDB to auto-generate the ID
    private String id;

    private String name;
    private int quantity;
    private double price;
}