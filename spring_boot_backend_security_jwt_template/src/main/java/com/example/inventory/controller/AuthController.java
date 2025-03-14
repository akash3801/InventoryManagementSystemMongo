package com.example.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.inventory.entity.AuthUser;
import com.example.inventory.entity.User;
import com.example.inventory.service.AuthService;

@RestController
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody User loginuser) throws Exception{
    	System.out.println("sign up user is: "+ loginuser);
        System.out.println("Register: "+loginuser.getUsername()+" : "+loginuser.getRole());
        boolean result=service.signUp(loginuser);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUser> signIn(@RequestBody User loginuser) throws Exception{
    	System.out.println("User received from requestbody is: "+ loginuser);
        System.out.println("Login: "+loginuser.getUsername()+" , "+loginuser.getRole()+" , "+loginuser.getPassword());

        return ResponseEntity.ok(service.signIn(loginuser));
    }    
}
