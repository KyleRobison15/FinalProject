package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.GardenItem;
import com.skilldistillery.cultivaid.entities.User;

public interface GardenItemRepository extends JpaRepository<GardenItem, Integer> {
	
	public List<GardenItem> findByActiveTrue();
	public List<GardenItem> findByActiveTrueAndUser_Username(String username);
	public List<GardenItem> findByActiveTrueAndUserAndAmountGreaterThan(User user, int amount);
	public GardenItem findByActiveTrueAndId(int id);
	public GardenItem findByActiveFalseAndId(int id);
	public List<GardenItem> findAllByUser(User user); 
}
