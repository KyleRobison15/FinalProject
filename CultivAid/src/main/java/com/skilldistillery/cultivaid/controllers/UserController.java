package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	@GetMapping("api/users/all")
	public List<User> getAllUser(HttpServletResponse res, Principal principal) {
		if ((userSvc.findByUsername(principal.getName()).getRole().equals("admin"))) {
			return userSvc.index();
		}
		else {
			return null;
		}
	}
	
	@GetMapping("users/{username}")
	public User getUserByUsername(@PathVariable String username, HttpServletResponse res) {
		
		User user = userSvc.findByUsername(username);
		
		return user;
	}
	
	@GetMapping("api/users/usernames")
	public List<String> getAllUsernames(HttpServletResponse res, Principal principal) {
		
		User user = userSvc.findByUsername(principal.getName());
		
		if (user == null) {
			res.setStatus(404);
			return null;
		}
		
		return userSvc.getAllUsernames();
	}
	
	@GetMapping("api/users")
	public User getLoggedInUser(HttpServletResponse res, Principal principal) {
		
		User user = userSvc.findByUsername(principal.getName());
		
		return user;
	}
	
	@PutMapping("api/users/password")
	public User resetPassword(@RequestBody User user, Principal principal) {
		return userSvc.resetPassword(user);
	}
	
	@PutMapping("api/users/{id}")
	public User updateUserAccount(@RequestBody User user, @PathVariable("id") int userId, HttpServletResponse res, Principal principal) {
		User userRequested = userSvc.findByUserId(userId);
		User loggedInUser = userSvc.findByUsername(principal.getName());
		Boolean isAdmin = loggedInUser.getRole().equals("admin") ? true : false;

		if (userRequested == null || !isAdmin && !userRequested.getUsername().equals(principal.getName())) {
			res.setStatus(404);
			return null;
		}
		
		User userUpdated = userSvc.updateUserAccount(user);
		if (userUpdated == null) {
			res.setStatus(400);
		}
		
		return userUpdated;
	}
	
	@DeleteMapping("api/users")
	public boolean deleteUserAccount(@RequestBody User user, HttpServletResponse res, Principal principal) {
		
		boolean isDeleted = false;
		
		if (user.getUsername().equals(principal.getName())) {	
			 isDeleted = userSvc.deleteUser(user);
		}
		
		if (isDeleted) {
			res.setStatus(204);
		} else {
			res.setStatus(404);
		}
		
		return isDeleted;
	}
	
}
