package com.skilldistillery.cultivaid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
