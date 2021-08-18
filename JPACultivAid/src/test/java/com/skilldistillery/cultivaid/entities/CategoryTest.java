package com.skilldistillery.cultivaid.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CategoryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Category category;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPACultivAid");
		
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close(); 
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		category = em.find(Category.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		category = null;
	}
	
	@Test
	@DisplayName("TEST: Produce Mappings")
	void test1() {
		assertNotNull(category);
		assertEquals("Vegetable", category.getName());
	}
	
	@Test
	@DisplayName("TEST: Category to Produce relational mapping")
	void test2() {
		assertNotNull(category.getProduce());
		assertTrue(category.getProduce().size() > 0);
	}
}
