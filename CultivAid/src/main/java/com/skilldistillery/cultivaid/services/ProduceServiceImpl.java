package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Produce;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.ProduceRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class ProduceServiceImpl implements ProduceService {
	
	@Autowired
	private ProduceRepository produceRepo;
	
	@Autowired 
	private UserRepository userRepo; 

	@Override
	public List<Produce> index(String username) {
		List<Produce> produce = null;
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			produce = produceRepo.findAll();
		}
		
		return produce;
	}

	@Override
	public Produce create(String username, Produce produce) {
		
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			produce.setActive(true);
			produce = produceRepo.saveAndFlush(produce);
		}
		
		return produce; 
	}

	@Override
	public Produce update(String username, Produce produce) {
		
		User user = userRepo.findByUsername(username);
		
		if(user != null) {
			produce = produceRepo.saveAndFlush(produce);
		}
		
		return produce; 
	}
	
}

