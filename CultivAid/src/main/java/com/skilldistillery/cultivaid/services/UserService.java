package com.skilldistillery.cultivaid.services;

import com.skilldistillery.cultivaid.entities.User;

public interface UserService {

	User findByUsername(String username);
	User findByUserId(int uId);
	User resetPassword(User user);
	User updateUserAccount(User user);
	boolean deleteUser(User user);

}
