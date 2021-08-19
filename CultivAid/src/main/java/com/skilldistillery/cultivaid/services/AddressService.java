package com.skilldistillery.cultivaid.services;

import com.skilldistillery.cultivaid.entities.Address;

public interface AddressService {

	public Address retrieveById(int id);
	public Address create(Address address);
	public Address update(Address addr);

 
	
}
