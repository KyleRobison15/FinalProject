package com.skilldistillery.cultivaid.services;

import java.util.ArrayList;
import java.util.List;

import com.skilldistillery.cultivaid.entities.GardenItem;
import com.skilldistillery.cultivaid.entities.User;

public interface GardenItemService {	
	
	public List<GardenItem> indexAll(User user);  // Return all garden items
	public List<GardenItem> index(String username);  // Return all garden items belonging to user
	public GardenItem retrieveById(int id);
	public GardenItem create(GardenItem item, String username);
	public GardenItem update(GardenItem item);
	public boolean delete(int id);
	public List<ArrayList<Object>> indexWithinDistance(Double latitude, Double longitude, int distance);  //NON AUTHENTICATED
	public List<ArrayList<Object>> indexWithinDistance(String username, int distance);
	public GardenItem retrieveByIdForUpdate(int id);
}
