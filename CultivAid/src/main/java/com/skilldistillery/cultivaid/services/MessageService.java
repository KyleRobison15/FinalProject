package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Message;

public interface MessageService {
	public List<Message> index(String username1, String username2);
	public List<Message> show(String username1, String username2, int userId); 
	public Message create(Message message, String username1, String username2);
	public Message markAsViewed(int messageId, String username);
}
