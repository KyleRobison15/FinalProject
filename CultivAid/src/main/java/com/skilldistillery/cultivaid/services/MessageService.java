package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Message;

public interface MessageService {
	public List<Message> index(String username);
}
