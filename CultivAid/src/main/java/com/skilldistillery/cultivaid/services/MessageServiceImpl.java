package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.GardenItem;
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
	
	public List<Message> index(String username){
		
		List<Message> messages = null; 
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			messages = messageRepo.findBySendingUser_Username(username);
		}
		
		return messages; 
	}

}
