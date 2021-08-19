package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.GardenItemComment;

public interface GardenItemCommentService {
	
	List<GardenItemComment> findByGardenItemId(int itemId, String username);
	GardenItemComment addCommentForGardenItemId(int postId, GardenItemComment comment, String username);
	boolean deleteCommentForGardenItemId(int itemId, int commentId, String username);
}
