package com.skilldistillery.cultivaid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.cultivaid.entities.Produce;

public interface ProduceRepository extends JpaRepository<Produce, Integer> {

}
