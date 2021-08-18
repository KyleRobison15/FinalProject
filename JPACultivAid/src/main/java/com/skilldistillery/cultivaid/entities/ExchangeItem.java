package com.skilldistillery.cultivaid.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="exchange_item")
public class ExchangeItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private int quantity; 
	
	private boolean active;
	
	//exchange_id
	
	//garden_item_id
	
	
	//no-arg constructor
	public ExchangeItem() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "ExchangeItem [id=" + id + ", quantity=" + quantity + "]";
	}

}
