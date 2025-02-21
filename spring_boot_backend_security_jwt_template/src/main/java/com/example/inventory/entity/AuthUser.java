package com.example.inventory.entity;

public class AuthUser {
    String id;
    String username;
    String token;
    String role;
    public AuthUser() {
    }
 
    public AuthUser(String userId, String username, String token, String role) {
        this.id = userId;
        this.username = username;
        this.token = token;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public String getUserId() {
        return id;
    }

    public void setUserId(String userId) {
        this.id = userId;
    }
    
}