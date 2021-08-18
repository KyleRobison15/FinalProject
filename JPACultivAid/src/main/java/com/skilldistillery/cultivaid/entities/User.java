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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

////////////////////////// FIELDS //////////////////////////////

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	
	private String password;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	private String email;
	
	private String phone;
	
	private boolean active;
	
	private String role;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "create_date")
	@CreationTimestamp
	private LocalDateTime createDate;
	
	@OneToOne
	@JoinColumn(name="address_id")
	private Address address;
	
	@JsonIgnore
	@OneToMany(mappedBy="sendingUser")
	private List<Message> sentMessages;
	
	@JsonIgnore
	@OneToMany(mappedBy="receivingUser")
	private List<Message> receivedMessages;
	
	@JsonIgnore
	@OneToMany (mappedBy="leftByUser")
	private List<GardenItemComment> gardenItemComments;
	
	@JsonIgnore
	@OneToMany (mappedBy="user")
	private List<GardenItem> gardenItems;
	
	@JsonIgnore
	@OneToMany(mappedBy="buyer")
	private List<Exchange> exchanges;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<WishlistProduce> wishListProduce;
	
	
////////////////////////// CONSTRUCTORS //////////////////////////////
	
	public User () {}

////////////////////////// METHODS //////////////////////////////

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}
	
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	public List<Message> getSentMessages() {
		return sentMessages;
	}

	public void setSentMessages(List<Message> sentMessages) {
		this.sentMessages = sentMessages;
	}

	public List<Message> getReceivedMessages() {
		return receivedMessages;
	}

	public void setReceivedMessages(List<Message> receivedMessages) {
		this.receivedMessages = receivedMessages;
	}

	public List<GardenItemComment> getGardenItemComments() {
		return gardenItemComments;
	}

	public void setGardenItemComments(List<GardenItemComment> gardenItemComments) {
		this.gardenItemComments = gardenItemComments;
	}
	
	public List<GardenItemComment> addGardenItemComment(GardenItemComment comment) {
		if (this.gardenItemComments == null || this.gardenItemComments.size() == 0) {
			this.gardenItemComments = new ArrayList<>();
		}
		if (!this.gardenItemComments.contains(comment)) {
			this.gardenItemComments.add(comment);
		}
		return this.gardenItemComments;
	}

	public void removeGardenItemComment(GardenItemComment comment) {
		if (this.gardenItemComments != null && this.gardenItemComments.contains(comment)) {
			this.gardenItemComments.remove(comment);
		}
	}

	public List<GardenItem> getGardenItems() {
		return gardenItems;
	}

	public void setGardenItems(List<GardenItem> gardenItems) {
		this.gardenItems = gardenItems;
	}
	
	public List<GardenItem> addGardenItem(GardenItem item) {
		if (this.gardenItems == null || this.gardenItems.size() == 0) {
			this.gardenItems = new ArrayList<>();
		}
		if (!this.gardenItems.contains(item)) {
			this.gardenItems.add(item);
		}
		return this.gardenItems;
	}

	public void removeGardenItem(GardenItem item) {
		if (this.gardenItems != null && this.gardenItems.contains(item)) {
			this.gardenItems.remove(item);
		}
	}

	public List<Exchange> getExchanges() {
		return exchanges;
	}

	public void setExchanges(List<Exchange> exchanges) {
		this.exchanges = exchanges;
	}

	public List<WishlistProduce> getWishListProduce() {
		return wishListProduce;
	}

	public void setWishListProduce(List<WishlistProduce> wishListProduce) {
		this.wishListProduce = wishListProduce;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email + ", phone=" + phone + ", active=" + active
				+ ", role=" + role + ", imageUrl=" + imageUrl + ", createDate=" + createDate + "]";
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
