package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
	
	public List<Address> findByActiveTrue();
	public Address findByActiveTrueAndId(int id);
	
}
