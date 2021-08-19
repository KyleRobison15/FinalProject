package com.skilldistillery.cultivaid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.cultivaid.entities.Address;
import com.skilldistillery.cultivaid.repositories.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressRepository addressRepo;
	
	@Override
	public Address retrieveById(int id) {
		Address item = null;
		try {
			item = addressRepo.findByActiveTrueAndId(id);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return item;
	}
	
	@Override
	public Address create(Address address) {
		try {
			return addressRepo.saveAndFlush(address);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public Address update(Address addr) {
		Address addrToUpdate = retrieveById(addr.getId());
		addrToUpdate.setAddress(addr.getAddress());
		addrToUpdate.setAddress2(addr.getAddress2());
		addrToUpdate.setCity(addr.getCity());
		addrToUpdate.setStateAbbr(addr.getStateAbbr());
		addrToUpdate.setPostalCode(addr.getPostalCode());
		addrToUpdate.setLatitude(addr.getLatitude());
		addrToUpdate.setLongitude(addr.getLongitude());
		try {
			return addressRepo.saveAndFlush(addrToUpdate);
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
