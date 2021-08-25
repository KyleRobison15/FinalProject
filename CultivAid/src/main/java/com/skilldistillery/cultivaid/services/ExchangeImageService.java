package com.skilldistillery.cultivaid.services;

import java.util.List;

import com.skilldistillery.cultivaid.entities.ExchangeImage;

public interface ExchangeImageService {
	
	List<ExchangeImage> index();
	List<ExchangeImage> getExchangeImagesByExchange(int exchangeId);
	ExchangeImage add(ExchangeImage exchangeImage);
	ExchangeImage update();

}
