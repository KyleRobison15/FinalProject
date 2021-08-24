package com.skilldistillery.cultivaid.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Message;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.MessageRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class MessageServiceImpl implements MessageService {
	
	@Autowired 
	private MessageRepository messageRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<Message> index(String username) {
		List<Message> messages = null; 
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			messages = messageRepo.findBySendingUser_Username(username);
		}
		
		return messages;
	}

	@Override
	public List<Message> show(String username, int userId) {
		
		List<Message> messages = index(username);
		List<Message> userMessages = new ArrayList<>(); 
		
		for(Message message : messages) {
			if(message.getReceivingUser().getId() == userId) {
				userMessages.add(message);
			}
		}
		return userMessages; 
	}
	
	@Override
	public Message create(Message message, String username, String username2) {
		
		User sender = userRepo.findByUsername(username);
		User receiver = userRepo.findByUsername(username2);
		Message newMessage = null;
		
		if(sender != null && receiver != null) {
			newMessage = new Message(); 
			newMessage.setContent(message.getContent());
			newMessage.setSubject(message.getSubject());
			newMessage.setSendingUser(sender);
			newMessage.setReceivingUser(receiver);
			newMessage.setViewed(false);
			newMessage.setActive(true);
		}
	
		return messageRepo.saveAndFlush(newMessage); 
	}
	

}
