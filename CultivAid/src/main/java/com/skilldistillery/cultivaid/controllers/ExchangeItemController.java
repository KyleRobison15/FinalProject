package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.services.ExchangeItemService;
import com.skilldistillery.cultivaid.services.ExchangeService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class ExchangeItemController {
	
	@Autowired
	ExchangeItemService eiServe;
	
	@Autowired
	ExchangeService eServe;
	
	@GetMapping("exchangeItems")
	List<ExchangeItem> index(Principal principal, HttpServletResponse resp){
		
		return eiServe.getAllExchangeItems();
		
	}
	
	@GetMapping("exchangeItems/{id}")
	List<ExchangeItem> getExchangeItemsByExchange(@PathVariable int id, HttpServletResponse resp){
		Exchange exchange = eServe.findByExchangeId(id);
		return eServe.findExchangeItemsByExchange(exchange);
	}

}
