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
	public User findByUserId(int uId) {
		Optional<User> opt = userRepo.findById(uId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	} 

	@Override
	public User resetPassword(User user) {
		Optional<User> opt = userRepo.findById(user.getId());
		User managed = null; 
		if(opt.isPresent()) {
			managed = opt.get();
			
			managed.setPassword(passEncode.encode(user.getPassword()));
		}
		
		return userRepo.saveAndFlush(managed); 
	}
	
	@Override
	public User updateUserAccount(User user) {
		Optional<User> opt = userRepo.findById(user.getId());
		User managed = null; 
		if(opt.isPresent()) {
			managed = opt.get();
			managed.setUsername(user.getUsername());
			managed.setFirstName(user.getFirstName());
			managed.setLastName(user.getLastName());
			managed.setEmail(user.getEmail());
			managed.setPhone(user.getPhone());
			managed.setImageUrl(user.getImageUrl());
			managed.setImageUrl(user.getImageUrl());
			
			managed.getAddress().setAddress(user.getAddress().getAddress());
			managed.getAddress().setAddress2(user.getAddress().getAddress2());
			managed.getAddress().setCity(user.getAddress().getCity());
			managed.getAddress().setStateAbbr(user.getAddress().getStateAbbr());
			managed.getAddress().setPostalCode(user.getAddress().getPostalCode());
		
		}
		
		try {
			return userRepo.saveAndFlush(managed);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} 
	}

	@Override
	public boolean deleteUser(User user) {
		User userToDelete = userRepo.findByUsername(user.getUsername());
		
		if (userToDelete != null) {
			userToDelete.setActive(false);
			userRepo.saveAndFlush(userToDelete);
			return true;
		}
		
		return false;
	}

}
