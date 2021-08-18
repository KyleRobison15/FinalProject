package com.skilldistillery.cultivaid.entities;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Produce {
	
	///////////
	// Fields
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	@Column(name = "avg_item_weight")
	private double averageItemWeight;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	@OneToMany(mappedBy = "produce")
	private List<WishlistProduce> wishlistProduce;
	
	@JsonIgnore
	@OneToMany (mappedBy="produce")
	private List<GardenItem> gardenItems;
	
	////////////
	// Methods

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getAverageItemWeight() {
		return averageItemWeight;
	}

	public void setAverageItemWeight(double averageItemWeight) {
		this.averageItemWeight = averageItemWeight;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<WishlistProduce> getWishlistProduce() {
		return wishlistProduce;
	}

	public void setWishlistProduce(List<WishlistProduce> wishlistProduce) {
		this.wishlistProduce = wishlistProduce;
	}

	public List<GardenItem> getGardenItems() {
		return gardenItems;
	}

	public void setGardenItems(List<GardenItem> gardenItems) {
		this.gardenItems = gardenItems;
	}
	
	public List<GardenItem> addGardenItem(GardenItem gi) {
		if (this.gardenItems == null || this.gardenItems.size() == 0) {
			this.gardenItems = new ArrayList<>();
		}
		if (!this.gardenItems.contains(gi)) {
			this.gardenItems.add(gi);
		}
		return this.gardenItems;		
	}
	
	public void removeGardenItem(GardenItem gi) {
		if (this.gardenItems != null && this.gardenItems.contains(gi)) {
			this.gardenItems.remove(gi);
		}
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
		Produce other = (Produce) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Produce [id=" + id + ", name=" + name + ", averageItemWeight=" + averageItemWeight + ", imageUrl="
				+ imageUrl + ", category=" + category + "]";
	}

}
