package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.ExchangeImage;

public interface ExchangeImageRepository extends JpaRepository<ExchangeImage, Integer>{
	
	List<ExchangeImage> findExchangeImageByExchangeId(int exchangeId);

}
