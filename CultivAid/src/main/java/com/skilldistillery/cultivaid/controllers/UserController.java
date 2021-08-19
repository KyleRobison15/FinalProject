package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.services.UserService;

@RestController
//@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4210"})
public class UserController {
	
	@Autowired
	private UserService userSvc;

	@GetMapping("api/users/{username}")
	public User getUserByUsername(@PathVariable String username, HttpServletResponse res, Principal principal) {
		
		User user = userSvc.findByUsername(principal.getName());
		
		return user;
	}
	
	@PutMapping("users/password")
	public User updateUserPassword(@RequestBody User user) {
		return userSvc.updateUser(user);
	}
	
}
