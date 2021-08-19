package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;

public interface ExchangeService {
	
	public Exchange create(String username, List<ExchangeItem> exchangeItems);
	public List<Exchange> findBuyerExchangesByUsername(String username);
	public List<Exchange> findSellerExchangesByUserId(int userId);
	public Exchange update(Exchange exchange);
	public List<ExchangeItem> findExchangeItemsByExchange(Exchange exchange);
	public Exchange findByExchangeId(int id);

}
