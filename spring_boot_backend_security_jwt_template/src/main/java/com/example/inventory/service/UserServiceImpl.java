package com.example.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository ur;

	
	@Override
	public User registerUser(User user) {
		return ur.save(user);

	}

	@Override
	public User loginUser(User user) {
		return ur.save(user);
	}

    
}