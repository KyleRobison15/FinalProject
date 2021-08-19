package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;

public interface ExchangeService {
	
	public Exchange create(String username, List<ExchangeItem> exchangeItems);
	public List<Exchange> findBuyerExchangesByUsername(String username);

}
