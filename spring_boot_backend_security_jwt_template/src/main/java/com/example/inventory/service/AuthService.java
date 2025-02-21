package com.example.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.inventory.config.JwtUtils;
import com.example.inventory.entity.AuthUser;
import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	UserRepository repo;
	
	@Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public boolean signUp(User loginuser){	
        System.out.println("loginng in     ......--------------------->"+loginuser);
        User existingUser=repo.findByUsername(loginuser.getUsername());
        if(existingUser!=null){

            throw new RuntimeException("User exists");
        }
        User user=new User();
        user.setUsername(loginuser.getUsername());
        user.setEmail(loginuser.getEmail());
        user.setMobileNumber(loginuser.getMobileNumber());
        user.setPassword(passwordEncoder.encode(loginuser.getPassword()));
        user.setRole(loginuser.getRole());
        repo.save(user);
        return true;
    }
    
    public AuthUser signIn(User loginuser){
        Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginuser.getUsername(), loginuser.getPassword()));
        System.out.println("authentication is: "+authentication.isAuthenticated());
        if(authentication.isAuthenticated()){
            User user=repo.findByUsername(loginuser.getUsername());
            String token=jwtUtils.generateToken(loginuser.getUsername());
            return new AuthUser(user.getId(),user.getUsername(), token, user.getRole());
        } else {
            throw new UsernameNotFoundException("Invalid username or password");
        }
    }

	
}
