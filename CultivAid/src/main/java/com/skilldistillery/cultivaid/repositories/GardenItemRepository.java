package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.GardenItem;

public interface GardenItemRepository extends JpaRepository<GardenItem, Integer> {
	public List<GardenItem> findByUser_Username(String username);
}
