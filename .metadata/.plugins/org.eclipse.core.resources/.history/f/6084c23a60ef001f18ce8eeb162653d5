package com.example.inventory.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document(collection = "users") // Specifies the MongoDB collection name
@NoArgsConstructor
@Data
@AllArgsConstructor
@ToString
public class User {
    
    @Id
    private String id; // MongoDB stores IDs as Strings (ObjectId)

    private String email;
    private String password;
    private String username;
    private String mobileNumber;
    private String role;
}