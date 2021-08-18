package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.GardenItem;
import com.skilldistillery.cultivaid.services.GardenItemService;

@RestController
public class GardenItemController {
	
	@Autowired
	private GardenItemService itemSvc; 
	
	@GetMapping("api/gardenitems")
	public List<GardenItem> index(HttpServletResponse res, Principal principal) {
		
		System.out.println("==================================================================");
		System.out.println("==================================================================");
		System.out.println(principal.getName());
		System.out.println("==================================================================");
		System.out.println("==================================================================");
		
		List<GardenItem> items = itemSvc.index(principal.getName());
		
		if(items == null) {
			res.setStatus(404); 
		}
		
		return items;
	}

}
