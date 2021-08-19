package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Message;
import com.skilldistillery.cultivaid.services.MessageService;

@RestController
public class MessageController {
	
	@Autowired
	private MessageService messageSvc; 
	
	@GetMapping("api/messages")
	public List<Message> index(HttpServletResponse res, Principal principal) {
		
		List<Message> messages = messageSvc.index(principal.getName());
		
		if(messages == null) {
			res.setStatus(404); 
		}
		
		return messages;
	}
	
	@GetMapping("api/messages/{userId}")
	public List<Message> show(
			HttpServletResponse res, 
			Principal principal, 
			@PathVariable int userId
			) {
		
		return messageSvc.show(principal.getName(), userId);
	}
	
	@PostMapping("api/messages/{receivingUserId}")
	public Message create(
			HttpServletResponse res, 
			Principal principal, 
			@PathVariable int receivingUserId, 
			@RequestBody Message message
			) {
		
		return messageSvc.create(message, principal.getName(), receivingUserId);
	}

}
