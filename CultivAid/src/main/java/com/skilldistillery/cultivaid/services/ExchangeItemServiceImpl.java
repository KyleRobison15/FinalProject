package com.skilldistillery.cultivaid.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.repositories.ExchangeItemRepository;
import com.skilldistillery.cultivaid.repositories.ExchangeRepository;

@Service
public class ExchangeItemServiceImpl implements ExchangeItemService{
	
	@Autowired
	ExchangeItemRepository eiRepo;
	
	@Autowired
	ExchangeRepository eRepo;

	@Override
	public List<ExchangeItem> getAllExchangeItems() {
		
		return eiRepo.findAll();
	}


}
