package com.example.inventory.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	 @Autowired
	    private UserRepository arepo;

	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        User user = arepo.findByUsername(username);
	        if(user==null){
	            throw new UsernameNotFoundException("Invalid username");
	        }
	        return new CustomUserDetails(user);
	    }

}
