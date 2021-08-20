package com.skilldistillery.cultivaid.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="exchange_item")
public class ExchangeItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private int quantity; 
	
	private boolean active;
	
	//exchange_id
	@ManyToOne
	@JoinColumn(name="exchange_id")
	@JsonIgnoreProperties({"exchangeItems"})
	private Exchange exchange; 
	
	//garden_item_id
	@ManyToOne
	@JoinColumn(name="garden_item_id")
	private GardenItem gardenItem; 
	
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

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Exchange getExchange() {
		return exchange;
	}

	public void setExchange(Exchange exchange) {
		this.exchange = exchange;
	}

	public GardenItem getGardenItem() {
		return gardenItem;
	}

	public void setGardenItem(GardenItem gardenItem) {
		this.gardenItem = gardenItem;
	}

	@Override
	public String toString() {
		return "ExchangeItem [id=" + id + ", quantity=" + quantity + ", isActive=" + active + "]";
	}

}
