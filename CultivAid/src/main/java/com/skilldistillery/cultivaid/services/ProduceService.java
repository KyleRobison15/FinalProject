package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Produce;

public interface ProduceService {
	List<Produce> index(String username); 
	Produce create(String username, Produce produce); 
	Produce update(String username, Produce produce); 
}
