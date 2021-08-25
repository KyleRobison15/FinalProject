package com.skilldistillery.cultivaid.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.ExchangeImage;
import com.skilldistillery.cultivaid.services.ExchangeImageService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class ExchangeImageController {
	
	@Autowired 
	ExchangeImageService eiServe;
	
	@GetMapping("exchangeImage/{id}")
	List<ExchangeImage> findExchangeImagesByExchangeId(@PathVariable int id){
		return eiServe.getExchangeImagesByExchange(id);
	}
	
	@PostMapping("exchangeImage")
	ExchangeImage addExchangeImage(@RequestBody ExchangeImage exchangeImage) {
		System.out.println("=====================================");
		System.out.println(exchangeImage.toString());
		System.out.println("=====================================");
		return eiServe.add(exchangeImage);
	}
	
}
