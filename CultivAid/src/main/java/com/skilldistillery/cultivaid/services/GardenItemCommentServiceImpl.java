package com.skilldistillery.cultivaid.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.GardenItem;
import com.skilldistillery.cultivaid.entities.GardenItemComment;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.GardenItemCommentRepository;
import com.skilldistillery.cultivaid.repositories.GardenItemRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class GardenItemCommentServiceImpl implements GardenItemCommentService {
	
	@Autowired
	private GardenItemCommentRepository itemCommentRepo;
	
	@Autowired
	private GardenItemRepository itemRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<GardenItemComment> findByGardenItemId(int itemId, String username) {
		
		User user = userRepo.findByUsername(username);
		List<GardenItemComment> comments = null;
		
		
		if(user != null && itemRepo.existsById(itemId)) {
			comments = itemCommentRepo.findByGardenItem_Id(itemId);
		}
		
		return comments;
	}

	@Override
	public GardenItemComment addCommentForGardenItemId(int itemId, GardenItemComment comment, String username) {
		
		User user = userRepo.findByUsername(username);
		Optional<GardenItem> itemOp = itemRepo.findById(itemId);
		
		System.out.println("==========================");
		System.out.println(user);
		System.out.println("==========================");
		System.out.println(itemOp.isPresent());
		
		if (user != null && itemOp.isPresent()) { // If we got back an Optional then assign the comment to this item and persist it:
			GardenItem item = itemOp.get(); // Retrieve the GardenItem entity from the Optional container
			comment.setGardenItem(item);	//Assign this comment to a valid GardenItem
			comment.setLeftByUser(user);
			return itemCommentRepo.saveAndFlush(comment); // Persist the comment to the DB
		}
		return null; // Return null if we did not get a valid GardenItem back
	}

	@Override
	public boolean deleteCommentForGardenItemId(int itemId, int commentId, String username) {
		// TODO Auto-generated method stub
		return false;
	}
	
	
	

}
