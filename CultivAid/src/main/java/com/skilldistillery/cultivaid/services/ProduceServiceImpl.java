package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.entities.Produce;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.ExchangeRepository;
import com.skilldistillery.cultivaid.repositories.ProduceRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class ProduceServiceImpl implements ProduceService {
	
	@Autowired
	private ProduceRepository produceRepo;
	
	@Autowired 
	private UserRepository userRepo;
	
	@Autowired
	private ExchangeRepository exchangeRepo;

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

	@Override
	public double calculateWastePrevented() {
		
		double ouncesFoodSaved = 0;
		List<Exchange> allExchanges = exchangeRepo.findAll();
		List<ExchangeItem> items = null;
		
		for (Exchange exchange : allExchanges) {
			
			if (exchange.isComplete()) {
				items = exchange.getExchangeItems();
				
				for (ExchangeItem item : items) {
					Double avgProduceWt = item.getGardenItem().getProduce().getAverageItemWeight();
					ouncesFoodSaved += (avgProduceWt * item.getQuantity());
				}
			}
		}
		
		return (ouncesFoodSaved / 16);
	}
	
}

