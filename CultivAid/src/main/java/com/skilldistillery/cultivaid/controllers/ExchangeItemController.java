package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.ExchangeItem;
import com.skilldistillery.cultivaid.services.ExchangeItemService;

@RestController
public class ExchangeItemController {
	
	@Autowired
	ExchangeItemService eiServe;
	
	@GetMapping("exchangeItems")
	List<ExchangeItem> index(Principal principal, HttpServletResponse resp){
		
		return eiServe.getAllExchangeItems();
		
	}

}
