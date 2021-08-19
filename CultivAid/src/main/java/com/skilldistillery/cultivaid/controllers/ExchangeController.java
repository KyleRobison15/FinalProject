package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.services.ExchangeService;

@RestController
public class ExchangeController {
	
	@Autowired
	ExchangeService eServe;
	
	@GetMapping("api/exchanges/")
	List<Exchange> getExchangesByBuyerUsername(Principal principal, HttpServletResponse resp){
		
		List<Exchange> exchanges = eServe.findBuyerExchangesByUsername(principal.getName());
		
		return exchanges;
		
	}

	@PostMapping("api/exchanges/")
	Exchange createExchange(Principal principal, @RequestBody List<ExchangeItem> exchangeItems){
		
		return eServe.create(principal.getName(), exchangeItems);
	}

}
