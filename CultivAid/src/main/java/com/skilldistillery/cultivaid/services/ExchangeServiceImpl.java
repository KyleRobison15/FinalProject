package com.skilldistillery.cultivaid.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.repositories.ExchangeItemRepository;
import com.skilldistillery.cultivaid.repositories.ExchangeRepository;
import com.skilldistillery.cultivaid.repositories.UserRepository;

@Service
public class ExchangeServiceImpl implements ExchangeService{

	@Autowired
	ExchangeRepository eRepo;
	
	@Autowired
	ExchangeItemRepository eiRepo;
	
	@Autowired
	UserRepository uRepo;

	@Override
	public Exchange create(String buyerUsername, List<ExchangeItem> exchangeItems) {
		Exchange exchange = new Exchange();
		Exchange newExchange = null;
		
		User buyer = uRepo.findByUsername(buyerUsername);

		exchange.setBuyer(buyer);
		newExchange = eRepo.saveAndFlush(exchange);
			
		for(int i=0; i<exchangeItems.size(); i++) {
			exchangeItems.get(i).setExchange(newExchange);
			eiRepo.saveAndFlush(exchangeItems.get(i));
		}
		
		return newExchange;
	}

	@Override
	public List<Exchange> findBuyerExchangesByUsername(String username) {
		
		User buyer = uRepo.findByUsername(username);
		
		List<Exchange> exchanges = eRepo.findByBuyer_Username(buyer.getUsername());
		
		return exchanges;
	}
	
	
	
	
	
}
