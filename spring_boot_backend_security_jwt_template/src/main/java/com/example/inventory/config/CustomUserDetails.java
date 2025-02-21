package com.example.inventory.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.inventory.entity.User;



public class CustomUserDetails extends User implements UserDetails {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5785020222222365317L;
//	 @Field("username") 
//	private String username;
//	@Field("password")
//    private String password;
    Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User byUsername) {
        super(byUsername.getId(), byUsername.getEmail(), byUsername.getPassword(), byUsername.getUsername(), byUsername.getMobileNumber(), byUsername.getRole()); // Ensure all fields are properly passed to parent class
        List<GrantedAuthority> auths = new ArrayList<>();
        auths.add(new SimpleGrantedAuthority(byUsername.getRole()));
        this.authorities = auths;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
