package com.skilldistillery.cultivaid.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table (name="exchange_image")
public class ExchangeImage {
	
//////////////////////////FIELDS //////////////////////////////
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column (name="image_url")
	private String imageUrl;
	
	private boolean active = true;
	
//	| id            | int(11)    | NO   | PRI | NULL              | auto_increment |
//	| exchange_date | date       | YES  |     | NULL              |                |
//	| rating        | tinyint(4) | YES  |     | NULL              |                |
//	| buyer_comment | text       | YES  |     | NULL              |                |
//	| complete      | tinyint(4) | YES  |     | NULL              |                |
//	| accepted      | tinyint(4) | YES  |     | NULL              |                |
//	| create_date   | datetime   | YES  |     | CURRENT_TIMESTAMP |                |
//	| active        | tinyint(4) | NO   |     | NULL              |                |
//	| buyer_id      | int(11)    | NO   | MUL | NULL              |                |
	
	//@JsonIgnoreProperties({"buyer"})
	
	@ManyToOne
	@JoinColumn (name="exchange_id")
	private Exchange exchange;
	
	
//////////////////////////CONSTRUCTORS //////////////////////////////

	public ExchangeImage() {
		super();
	}
	
	
//////////////////////////GETTERS SETTERS //////////////////////////////

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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
	
	
//////////////////////////TO STRING //////////////////////////////


	@Override
	public String toString() {
		return "ExchangeImage [id=" + id + ", imageUrl=" + imageUrl + ", active=" + active + ", exchange=" + exchange
				+ "]";
	}

	
//////////////////////////HASHCODE EQUALS //////////////////////////////

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExchangeImage other = (ExchangeImage) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	

}
