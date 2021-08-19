package com.skilldistillery.cultivaid.services;

import java.util.ArrayList;
import java.util.List;

import com.skilldistillery.cultivaid.entities.GardenItem;

public interface GardenItemService {	
	
	public List<GardenItem> index();  // Return all garden items
	public List<GardenItem> index(String username);  // Return all garden items belonging to user
//	public List<GardenItem> indexWithinDistance(String username, int distance);  // Return all garden items within specified distance of user
	public GardenItem retrieveById(int id);
	public GardenItem create(GardenItem item, String username);
	public GardenItem update(GardenItem item);
	public boolean delete(int id);
	List<ArrayList<Object>> indexWithinDistance(String username, int distance);

}
