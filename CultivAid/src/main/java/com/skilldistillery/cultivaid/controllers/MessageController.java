package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Message;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.services.MessageService;
import com.skilldistillery.cultivaid.services.UserService;

@RestController
public class MessageController {
	
	@Autowired
	private MessageService messageSvc; 
	
	@Autowired
	private UserService userSvc;
	
	@GetMapping("api/messages")
	public List<Message> index(HttpServletResponse res, Principal principal) {
		
//		User user = userSvc.findByUsername(principal.getName());

		List<Message> messages = messageSvc.index(principal.getName());
		
		if(messages == null) {
			res.setStatus(404); 
		}
		
		return messages;
	}

}
