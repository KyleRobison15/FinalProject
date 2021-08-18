package com.skilldistillery.cultivaid.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String content;
	
	@Column(name="create_time")
	private LocalDateTime createTime;
	
	private boolean viewed; 
	
	@ManyToOne
	@JoinColumn(name="sender_id")
	private User sendingUser;
	
	@ManyToOne
	@JoinColumn(name="reciever_id")
	private User receivingUser;
	
	//no-arg constructor
	public Message() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreateTime() {
		return createTime;
	}

	public void setCreateTime(LocalDateTime createTime) {
		this.createTime = createTime;
	}

	public boolean isViewed() {
		return viewed;
	}

	public void setViewed(boolean viewed) {
		this.viewed = viewed;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", createTime=" + createTime + ", viewed=" + viewed + "]";
	}

}
