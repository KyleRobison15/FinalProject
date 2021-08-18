package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.GardenItem;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.GardenItemRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class GardenItemServiceImpl implements GardenItemService {

	@Autowired
	private GardenItemRepository itemRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<GardenItem> index(String username) {
		
		List<GardenItem> items = null; 
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			items = itemRepo.findByUser_Username(username);
		}
		
		return items; 
	} 
	
	
}
