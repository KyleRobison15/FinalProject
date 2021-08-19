package com.skilldistillery.cultivaid.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired 
	private PasswordEncoder passEncode;

	@Override
	public User findByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public User updateUser(User user) {
		Optional<User> opt = userRepo.findById(user.getId());
		User managed = null; 
		if(opt.isPresent()) {
			managed = opt.get();
			
			managed.setPassword(passEncode.encode(user.getPassword()));
		}
		
		return userRepo.saveAndFlush(managed); 
	}

	@Override
	public boolean deleteUser(User user, int uId) {
		// TODO Auto-generated method stub
		return false;
	} 

}
