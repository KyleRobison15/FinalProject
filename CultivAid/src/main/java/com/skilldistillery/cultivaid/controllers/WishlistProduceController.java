package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.WishlistProduce;
import com.skilldistillery.cultivaid.services.WishlistProduceService;

@RestController
public class WishlistProduceController {

	@Autowired
	WishlistProduceService wpServe;
	
	@GetMapping("api/wishlistProduce")
	List<WishlistProduce> getWishlistProduceByUsername(Principal principal, HttpServletResponse resp){
		
		return wpServe.getWishlistProduceByUsername(principal.getName());
	}
	
	@GetMapping("wishlistProduce/{id}")
	WishlistProduce getWishlistProduceById(@PathVariable int id, HttpServletResponse resp) {
		WishlistProduce wishlistProduce = null;
		
		wishlistProduce = wpServe.getByWishlistProduceId(id);
		
		if(wishlistProduce == null) {
			resp.setStatus(404);
		}
		
		return wishlistProduce;
	}
	
	@PostMapping("api/wishlistProduce")
	WishlistProduce addWishlistProduceToWishlist(@RequestBody WishlistProduce wishlistProduce, HttpServletResponse resp, HttpServletRequest req){
		
		WishlistProduce addedWishlistProduce = null;
		
		addedWishlistProduce = wpServe.add(wishlistProduce);
		
		if(addedWishlistProduce == null) {
			resp.setStatus(404);
		}
		else {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(addedWishlistProduce.getId());
			resp.setHeader("Location", url.toString());
		}
		
		return addedWishlistProduce;
	}
	
	@PutMapping("api/wishlistProduce")
	WishlistProduce updateWishlistProduce(@RequestBody WishlistProduce wishlistProduce, HttpServletResponse resp) {
		WishlistProduce addedWishlistProduce = null;
		
		addedWishlistProduce = wpServe.update(wishlistProduce);
		
		if(addedWishlistProduce == null) {
			resp.setStatus(404);
		}
		return addedWishlistProduce;
	}
	
	
}
