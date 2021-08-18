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

class ProduceTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Produce produce;
	
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
		produce = em.find(Produce.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		produce = null;
	}
	
	@Test
	@DisplayName("TEST: Produce Mappings")
	void test1() {
		assertNotNull(produce);
		assertEquals("Carrot", produce.getName());
		assertEquals("https://burea-uinsurance.com/en/wp-content/uploads/2019/11/how-much-does-a-medium-sized-carrot-weigh.jpg",
					 produce.getImageUrl());
		assertEquals(2, produce.getAverageItemWeight());
	}
	
	@Test
	@DisplayName("TEST: Produce to Category relational mapping")
	void test2() {
		assertNotNull(produce.getCategory());
		assertEquals("Vegetable", produce.getCategory().getName());
	}

}
