package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Message;
import com.skilldistillery.cultivaid.services.MessageService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class MessageController {
	
	@Autowired
	private MessageService messageSvc; 
	
	@GetMapping("api/messages")
	public List<Message> index(HttpServletResponse res, Principal principal) {
		
		List<Message> messages = messageSvc.index(principal.getName(), principal.getName());
		
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
		
		return messageSvc.show(principal.getName(), principal.getName(), userId);
	}
	
	@PostMapping("api/messages/{username}")
	public Message create(
			HttpServletResponse res, 
			Principal principal, 
			@PathVariable("username") String username2, 
			@RequestBody Message message
			) {
		
		return messageSvc.create(message, principal.getName(), username2);
	}
	
	@PutMapping("api/messages/{id}")
	public Message markAsViewed(@PathVariable("id") int messageId, Principal principal, HttpServletResponse res) {
		
		Message updatedMessage = messageSvc.markAsViewed(messageId, principal.getName());
		
		if (updatedMessage == null) {
			res.setStatus(404);
			return null;
		}else {
			return updatedMessage;
		}
		
	}
	
	@DeleteMapping("api/messages/{id}")
	public boolean deactivateMessage(@PathVariable("id") int messageId, Principal principal, HttpServletResponse res) {
		
		boolean isDeleted = messageSvc.deactivateMessage(messageId, principal.getName());
		
		if (!isDeleted) {
			res.setStatus(404);
			return isDeleted;
		}else {
			return isDeleted;
		}
	}

}
