package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.GardenItem;

public interface GardenItemRepository extends JpaRepository<GardenItem, Integer> {
	
	public List<GardenItem> findByActiveTrue();
	public List<GardenItem> findByActiveTrueAndUser_Username(String username);
	public GardenItem findByActiveTrueAndId(int id);
}
