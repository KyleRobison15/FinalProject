package com.skilldistillery.cultivaid.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.ExchangeImage;
import com.skilldistillery.cultivaid.repositories.ExchangeImageRepository;
import com.skilldistillery.cultivaid.repositories.ExchangeRepository;

@Service
public class ExchangeImageServiceImpl implements ExchangeImageService {
	
	@Autowired
	ExchangeImageRepository eiRepo;
	
	@Autowired
	ExchangeRepository eRepo;

	@Override
	public List<ExchangeImage> index() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ExchangeImage> getExchangeImagesByExchange(int exchangeId) {

		return eiRepo.findExchangeImageByExchangeId(exchangeId);
	}

	@Override
	public ExchangeImage add(ExchangeImage exchangeImage) {
		return eiRepo.saveAndFlush(exchangeImage);
	}

	@Override
	public ExchangeImage update() {
		// TODO Auto-generated method stub
		return null;
	}

}
