package com.skilldistillery.cultivaid.entities;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Exchange {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private int rating; 
	
	private boolean active;
	
	@Column(name="buyer_comment")
	private String buyerComment;
	
	private boolean complete; 
	
	private boolean accepted; 
	
	@Column(name="exchange_date")
	private LocalDateTime exchangeDate;
	
	@Column(name="create_date")
	private LocalDateTime createDate;
	
	@ManyToOne
	@JoinColumn(name="buyer_id")
	private User buyer;
	
	@OneToMany(mappedBy="exchange")
	private List<ExchangeItem> exchangeItems; 
	

	//no-arg constructor
	public Exchange() {}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getRating() {
		return rating;
	}


	public void setRating(int rating) {
		this.rating = rating;
	}


	public String getBuyerComment() {
		return buyerComment;
	}


	public void setBuyerComment(String buyerComment) {
		this.buyerComment = buyerComment;
	}


	public boolean isComplete() {
		return complete;
	}


	public void setComplete(boolean complete) {
		this.complete = complete;
	}


	public boolean isAccepted() {
		return accepted;
	}


	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}


	public LocalDateTime getExchangeDate() {
		return exchangeDate;
	}


	public void setExchangeDate(LocalDateTime exchangeDate) {
		this.exchangeDate = exchangeDate;
	}


	public LocalDateTime getCreateDate() {
		return createDate;
	}


	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public boolean getActive() {
		return active;
	}
	
	
	public void setActive(boolean active) {
		this.active = active;
	}
	
	
	public User getBuyer() {
		return buyer;
	}


	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}


	public List<ExchangeItem> getExchangeItems() {
		return exchangeItems;
	}
	
	
	public void setExchangeItems(List<ExchangeItem> exchangeItems) {
		this.exchangeItems = exchangeItems;
	}
	
	@Override
	public String toString() {
		return "Exchange [id=" + id + ", rating=" + rating + ", active=" + active + ", buyerComment=" + buyerComment
				+ ", complete=" + complete + ", accepted=" + accepted + ", exchangeDate=" + exchangeDate
				+ ", createDate=" + createDate + ", buyer=" + buyer + "]";
	}


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
		Exchange other = (Exchange) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	

}
