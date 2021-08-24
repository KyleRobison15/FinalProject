package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Message;

public interface MessageService {
	public List<Message> index(String username);
	public List<Message> show(String username, int userId); 
	public Message create(Message message, String username, String username2); 
}
