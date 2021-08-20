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

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String subject;
	
	private String content;
	
	@CreationTimestamp
	@Column(name="create_time")
	private LocalDateTime createTime;
	
	private boolean viewed; 
	
	@ManyToOne
	@JoinColumn(name="sender_id")
	private User sendingUser;
	
	@ManyToOne
	@JoinColumn(name="reciever_id")
	private User receivingUser;
	
	private boolean active;
	
	@ManyToOne
	@JoinColumn(name = "in_reply_to_id")
	private Message inReplyToMessage;
	
	@JsonIgnore
	@OneToMany(mappedBy = "inReplyToMessage")
	private List<Message> replies;
	
	//no-arg constructor
	public Message() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
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

	public User getSendingUser() {
		return sendingUser;
	}

	public void setSendingUser(User sendingUser) {
		this.sendingUser = sendingUser;
	}

	public User getReceivingUser() {
		return receivingUser;
	}

	public void setReceivingUser(User receivingUser) {
		this.receivingUser = receivingUser;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Message getInReplyToMessage() {
		return inReplyToMessage;
	}

	public void setInReplyToMessage(Message inReplyToMessage) {
		this.inReplyToMessage = inReplyToMessage;
	}

	public List<Message> getReplies() {
		return replies;
	}

	public void setReplies(List<Message> replies) {
		this.replies = replies;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", subject=" + subject + ", content=" + content + ", createTime=" + createTime
				+ ", viewed=" + viewed + ", sendingUser=" + sendingUser + ", receivingUser=" + receivingUser
				+ ", active=" + active + "]";
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
		Message other = (Message) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
