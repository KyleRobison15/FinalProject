package com.skilldistillery.cultivaid.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
	public List<Message> index(String username1, String username2) {
		List<Message> messages = null; 
		User user = userRepo.findByUsername(username1);
		
		if(user != null) {
			messages = messageRepo.findBySendingUser_UsernameOrReceivingUser_Username(username1, username2);
		}
		
		return messages;
	}

	@Override
	public List<Message> show(String username1, String username2, int userId) {
		
		List<Message> messages = index(username1, username2);
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
			
			if (message.getInReplyToMessage() != null) {
				
				Optional<Message> replyOpt = messageRepo.findById(message.getInReplyToMessage().getId());
				
				if (replyOpt.isPresent()) {
					newMessage.setInReplyToMessage(replyOpt.get());
				}
				
			}
			
		}
	
		return messageRepo.saveAndFlush(newMessage); 
	}

	@Override
	public Message markAsViewed(int messageId, String username) {
		
		Optional<Message> mesOpt = messageRepo.findById(messageId);
		Message managedMessage = null;
		
		if (mesOpt.isPresent()) {
			managedMessage = mesOpt.get();
			managedMessage.setViewed(true);
			return messageRepo.saveAndFlush(managedMessage);
		}else {
			return null;
		}
		
	}

	@Override
	public boolean deactivateMessage(int messageId, String username) {
		
		Optional<Message> mesOpt = messageRepo.findById(messageId);
		Message managedMessage = null;
		
		if (mesOpt.isPresent()) {
			managedMessage = mesOpt.get();
			managedMessage.setActive(false);
			messageRepo.saveAndFlush(managedMessage);
			return true;
		}else {
			return false;
		}
	}
	
}
