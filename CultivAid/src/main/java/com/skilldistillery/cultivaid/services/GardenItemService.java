package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.GardenItem;

public interface GardenItemService {	
	public List<GardenItem> index(String username); 
}
