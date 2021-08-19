package com.skilldistillery.cultivaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.GardenItemComment;

public interface GardenItemCommentRepository extends JpaRepository<GardenItemComment, Integer> {

	List<GardenItemComment> findByGardenItem_Id(int itemId);
}
