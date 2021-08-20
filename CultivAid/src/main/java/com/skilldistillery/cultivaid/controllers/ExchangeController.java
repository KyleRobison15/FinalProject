package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Exchange;
import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.entities.User;
import com.skilldistillery.cultivaid.services.ExchangeService;
import com.skilldistillery.cultivaid.services.UserService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class ExchangeController {
	
	@Autowired
	ExchangeService eServe;
	
	@Autowired
	UserService uServe;
	
	@GetMapping("api/exchanges/buyer")
	List<Exchange> getExchangesByBuyerUsername(Principal principal, HttpServletResponse resp){
		
		List<Exchange> exchanges = eServe.findBuyerExchangesByUsername(principal.getName());
		
		return exchanges;
	}
	
	@GetMapping("api/exchanges/seller")
	List<Exchange> getExchangesBySellerId(Principal principal, HttpServletResponse resp){
		
		User user = uServe.findByUsername(principal.getName());
		
		List<Exchange> exchanges = eServe.findSellerExchangesByUserId(user.getId());
		
		return exchanges;
	}
	
	@GetMapping("api/exchanges")
	List<Exchange> getExchangesByUser(Principal principal, HttpServletResponse resp){
		
		User user = uServe.findByUsername(principal.getName());
		
		List<Exchange> sellerExchanges = eServe.findSellerExchangesByUserId(user.getId());
		
		List<Exchange> buyerExchanges = eServe.findBuyerExchangesByUsername(principal.getName());
		
		List<Exchange> allUserExchanges = new ArrayList<>();
		
		allUserExchanges.addAll(sellerExchanges);
		allUserExchanges.addAll(buyerExchanges);
		
		return allUserExchanges;
	}

	@PostMapping("api/exchanges/")
	Exchange createExchange(Principal principal, @RequestBody List<ExchangeItem> exchangeItems){
		
		return eServe.create(principal.getName(), exchangeItems);
	}


	@PutMapping("api/exchanges/")
	Exchange updateExchange(Principal principal, @RequestBody Exchange exchange, HttpServletResponse resp) {
		Exchange updatedExchange = eServe.update(exchange);
		if(updatedExchange == null) {
			resp.setStatus(404);
		}
		return updatedExchange;
	}
	
//	@PostMapping("api/exchanges/")
//	Exchange createExchange(Principal principal, @RequestBody List<Object> objects){
//		
//		
//		return eServe.create(principal.getName(), (List<ExchangeItem>)objects.get(1), (Exchange)objects.get(0));
//	}
}
