package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.Exchange;

public interface ExchangeRepository extends JpaRepository<Exchange, Integer>{
	
	List<Exchange> findByBuyer_Username(String username);

}
