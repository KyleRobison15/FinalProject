package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.User;

public interface UserService {
	
	List<String> getAllUsernames();
	User findByUsername(String username);
	User findByUserId(int uId);
	User resetPassword(User user);
	User updateUserAccount(User user);
	boolean deleteUser(User user);

}
