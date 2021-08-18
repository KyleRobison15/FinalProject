package com.skilldistillery.cultivaid.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table (name="garden_item")
public class GardenItem {

//////////////////////////FIELDS //////////////////////////////

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	private String description;
	
	@Column (name="grow_method")
	private String growMethod;
	
	@Column (name="date_expected")
	private String dateExpected;
	
	private int amount;
	
	private String variety;
	
	private boolean pesticides;
	
	private boolean fertilizers;
	
	@Column (name="create_date")
	@CreationTimestamp
	private LocalDateTime createdDate;
	
	@JsonIgnore
	@OneToMany (mappedBy="gardenItem")
	private List<GardenItemComment> gardenItemComments;
	
	@ManyToOne
	@JoinColumn (name = "user_id")
	private User user;

	
	
//////////////////////////CONSTRUCTORS //////////////////////////////

	public GardenItem() {
		super();
	}


//////////////////////////GETTERS SETTERS //////////////////////////////

	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public String getGrowMethod() {
		return growMethod;
	}



	public void setGrowMethod(String growMethod) {
		this.growMethod = growMethod;
	}



	public String getDateExpected() {
		return dateExpected;
	}



	public void setDateExpected(String dateExpected) {
		this.dateExpected = dateExpected;
	}



	public int getAmount() {
		return amount;
	}



	public void setAmount(int amount) {
		this.amount = amount;
	}



	public String getVariety() {
		return variety;
	}



	public void setVariety(String variety) {
		this.variety = variety;
	}



	public boolean isPesticides() {
		return pesticides;
	}



	public void setPesticides(boolean pesticides) {
		this.pesticides = pesticides;
	}



	public boolean isFertilizers() {
		return fertilizers;
	}



	public void setFertilizers(boolean fertilizers) {
		this.fertilizers = fertilizers;
	}



	public LocalDateTime getCreatedDate() {
		return createdDate;
	}



	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}


	
	public List<GardenItemComment> getGardenItemComments() {
		return gardenItemComments;
	}


	public void setGardenItemComments(List<GardenItemComment> gardenItemComments) {
		this.gardenItemComments = gardenItemComments;
	}

	
	public List<GardenItemComment> addGardenItemComment(GardenItemComment gic) {
		if (this.gardenItemComments == null || this.gardenItemComments.size() == 0) {
			this.gardenItemComments = new ArrayList<>();
		}
		if (!this.gardenItemComments.contains(gic)) {
			this.gardenItemComments.add(gic);
		}
		return this.gardenItemComments;		
	}
	
	public void removeGardenItemComment(GardenItemComment gic) {
		if (this.gardenItemComments != null && this.gardenItemComments.contains(gic)) {
			this.gardenItemComments.remove(gic);
		}
	}
	
	public User getUser() {
		return user;
	}
	
	
	public void setUser(User user) {
		this.user = user;
	}
	
//////////////////////////TO STRING //////////////////////////////



	@Override
	public String toString() {
		return "GardenItem [id=" + id + ", description=" + description + ", growMethod=" + growMethod
				+ ", dateExpected=" + dateExpected + ", amount=" + amount + ", variety=" + variety + ", pesticides="
				+ pesticides + ", fertilizers=" + fertilizers + ", createdDate=" + createdDate + "]";
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
		GardenItem other = (GardenItem) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	

	
}
