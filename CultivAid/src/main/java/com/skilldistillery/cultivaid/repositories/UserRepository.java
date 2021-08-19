package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByUsername (String username);
	public List<User> findByActiveTrue();
	
}
