package com.example.inventory.service;

import com.example.inventory.entity.User;

public interface UserService {
	public User registerUser(User user);
	public User loginUser(User user);
}
