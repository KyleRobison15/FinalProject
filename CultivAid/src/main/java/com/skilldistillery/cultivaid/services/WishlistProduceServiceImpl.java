package com.skilldistillery.cultivaid.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Produce;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.entities.WishlistProduce;
import com.skilldistillery.cultivaid.repositories.ProduceRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;
import com.skilldistillery.cultivaid.repositories.WishlistProduceRepository;

@Service
public class WishlistProduceServiceImpl implements WishlistProduceService {
	
	@Autowired
	WishlistProduceRepository wpRepo;
	
	@Autowired
	UserRepository uRepo;
	
	@Autowired
	ProduceRepository pRepo;

	@Override
	public List<WishlistProduce> getWishlistProduceByUsername(String username) {
		 return wpRepo.findByUser_Username(username);
	}

	@Override
	public WishlistProduce getByWishlistProduceId(int id) {
		Optional<WishlistProduce> opt = wpRepo.findById(id);
		WishlistProduce wishlistProduce = null;
		
		if(opt.isPresent()) {
			wishlistProduce = opt.get();
		}
		return wishlistProduce;
	}

	@Override
	public WishlistProduce add(WishlistProduce wishlistProduce) {
		return wpRepo.saveAndFlush(wishlistProduce);
	}

	@Override
	public WishlistProduce update(WishlistProduce wishlistProduce) {
		WishlistProduce managed = null;
		
		managed = wpRepo.getById(wishlistProduce.getId());
		managed.setActive(wishlistProduce.isActive());
		
		if(managed != null) {
			managed = wpRepo.saveAndFlush(managed);
		}
		
		return managed;
	}

}
