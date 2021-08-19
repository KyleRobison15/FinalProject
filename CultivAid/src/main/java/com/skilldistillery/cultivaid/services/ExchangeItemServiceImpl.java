package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.repositories.ExchangeItemRepository;

@Service
public class ExchangeItemServiceImpl implements ExchangeItemService{
	
	@Autowired
	ExchangeItemRepository eiRepo;

	@Override
	public List<ExchangeItem> getAllExchangeItems() {
		
		return eiRepo.findAll();
	}

}
