package com.skilldistillery.cultivaid.services;

import com.skilldistillery.cultivaid.entities.User;

public interface UserService {

	User findByUsername(String username);
	User updateUser(User user);
	boolean deleteUser(User user, int uId);

}
