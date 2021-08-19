package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.WishlistProduce;

public interface WishlistProduceService {

	List<WishlistProduce> getWishlistProduceByUsername(String username);
	WishlistProduce getByWishlistProduceId(int id);
	WishlistProduce add(WishlistProduce wishlistProduce);
	WishlistProduce update(WishlistProduce wishlistProduce);
	
	
}
