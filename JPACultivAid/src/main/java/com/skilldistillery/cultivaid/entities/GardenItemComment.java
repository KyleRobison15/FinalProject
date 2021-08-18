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
@Table(name = "garden_item_comment")
public class GardenItemComment {

//////////////////////////FIELDS //////////////////////////////

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "create_date")
	@CreationTimestamp
	private LocalDateTime createdDate;

	private String content;

	@ManyToOne
	@JoinColumn(name = "garden_item_id")
	private GardenItem gardenItem;

	@ManyToOne
	@JoinColumn(name = "in_reply_to_id")
	private GardenItemComment inReplyToComment;

	@JsonIgnore
	@OneToMany(mappedBy = "inReplyToComment")
	private List<GardenItemComment> replies;
	
	@ManyToOne
	@JoinColumn(name = "sender_id")
	private User leftByUser;

//////////////////////////CONSTRUCTORS //////////////////////////////

	public GardenItemComment() {
		super();
	}

//////////////////////////GETTERS SETTERS //////////////////////////////

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public GardenItem getGardenItem() {
		return gardenItem;
	}

	public void setGardenItem(GardenItem gardenItem) {
		this.gardenItem = gardenItem;
	}

	public GardenItemComment getInReplyToComment() {
		return inReplyToComment;
	}

	public void setInReplyToComment(GardenItemComment inReplyToComment) {
		this.inReplyToComment = inReplyToComment;
	}

	public List<GardenItemComment> getReplies() {
		return replies;
	}

	public void setReplies(List<GardenItemComment> replies) {
		this.replies = replies;
	}

	public List<GardenItemComment> addReply(GardenItemComment reply) {
		if (this.replies == null || this.replies.size() == 0) {
			this.replies = new ArrayList<>();
		}
		if (!this.replies.contains(reply)) {
			this.replies.add(reply);
		}
		return this.replies;
	}

	public void removeGardenItemComment(GardenItemComment reply) {
		if (this.replies != null && this.replies.contains(reply)) {
			this.replies.remove(reply);
		}
	}

	public User getLeftByUser() {
		return leftByUser;
	}
	
	public void setLeftByUser(User leftByUser) {
		this.leftByUser = leftByUser;
	}
	
//////////////////////////TO STRING //////////////////////////////


	@Override
	public String toString() {
		return "GardenItemComment [id=" + id + ", createdDate=" + createdDate + ", content=" + content + ", gardenItem="
				+ gardenItem + "]";
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
		GardenItemComment other = (GardenItemComment) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
