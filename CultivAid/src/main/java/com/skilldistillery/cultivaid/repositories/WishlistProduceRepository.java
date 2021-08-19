package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.WishlistProduce;

public interface WishlistProduceRepository extends JpaRepository<WishlistProduce, Integer>{

	List<WishlistProduce> findByUser_Username(String username);
	
}
