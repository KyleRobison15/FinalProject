package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.services.AuthService;
import com.skilldistillery.cultivaid.services.UserService;

// We do not use api pathway here! Because those pathways require authentication...

@RestController
@CrossOrigin({"*", "http://localhost:4210/*"})
public class AuthController {

	@Autowired
	private AuthService authSrv;
	@Autowired
	private UserService userSvc;
	
	
	
	@PostMapping("register")
	public User register(@RequestBody User user, HttpServletResponse res) {

	    if (user == null) {
	        res.setStatus(400);
	    }

	    user = authSrv.register(user);

	    return user;
	}

	@GetMapping("authenticate")
	public User authenticate(Principal principal) {
		
	    return userSvc.findByUsername(principal.getName());
	}

	
}
