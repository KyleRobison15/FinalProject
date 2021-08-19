package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.GardenItemComment;
import com.skilldistillery.cultivaid.services.GardenItemCommentService;

@RestController
public class GardenItemCommentController {

	@Autowired
	private GardenItemCommentService itemCommentSrv;
	
	@GetMapping("api/gardenitems/{id}/comments")
	public List<GardenItemComment> getCommentsByItemId(@PathVariable("id") Integer itemId, HttpServletResponse res, Principal principal){
		
		List<GardenItemComment> comments = itemCommentSrv.findByGardenItemId(itemId, principal.getName());
		
		if(comments == null) {
			res.setStatus(404);
		}
		
		return comments;
	}
	
	@PostMapping("api/gardenitems/{id}/comments")
	public GardenItemComment addCommentForItem(@RequestBody GardenItemComment comment, @PathVariable("id") Integer itemId, HttpServletResponse res, HttpServletRequest req, Principal principal) {
		
		comment = itemCommentSrv.addCommentForGardenItemId(itemId, comment, principal.getName());
		
		try {
			if (comment == null) {
				res.setStatus(404);
			}
			else {
				res.setStatus(201);
				
				StringBuffer url = req.getRequestURL();
				url.append("/").append(comment.getId());
				
				res.setHeader("Location", url.toString());
				
			}
		} catch (Exception e) {
			res.setStatus(400); //This avoids a 500 error if the user gives us bad data for a comment.
		}

		return comment;
	}
	
}
