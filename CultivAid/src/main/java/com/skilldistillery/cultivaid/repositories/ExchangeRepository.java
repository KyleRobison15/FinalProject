package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.cultivaid.entities.Exchange;

public interface ExchangeRepository extends JpaRepository<Exchange, Integer>{
	
	List<Exchange> findByBuyer_Username(String username);
	
//	@Query()
//	List<Exchange> findSellerExchanges();
	
	List<Exchange> findDistinctByExchangeItems_GardenItem_User_Id(int userId);

}
