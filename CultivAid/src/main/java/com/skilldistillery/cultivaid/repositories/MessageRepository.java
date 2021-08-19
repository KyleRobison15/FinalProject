package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {
	public List<Message> findBySendingUser_Username(String username);
//	public List<Message> findBySendingUser_Id(int userId);
}

