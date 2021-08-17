package com.skilldistillery.cultivaid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername (String username);
	
}
