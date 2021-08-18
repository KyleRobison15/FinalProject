package com.skilldistillery.cultivaid.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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

}
