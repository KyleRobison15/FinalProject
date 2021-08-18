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

class WishlistProduceTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private WishlistProduce wishlistProduce;
	
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
		wishlistProduce = em.find(WishlistProduce.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		wishlistProduce = null;
	}
	
	@Test
	@DisplayName("TEST: WishlistProduce Mappings")
	void test1() {
		assertNotNull(wishlistProduce);
		//assertEquals("2021-08-17T00:00:00", wishlistProduce.getCreateDate());
		assertNotNull(wishlistProduce.getCreateDate());
		assertEquals(true, wishlistProduce.isActive());
	}
	
	@Test
	@DisplayName("TEST: WishlistProduce to User relational mapping")
	void test2() {
		assertNotNull(wishlistProduce.getUser());
		assertEquals("Bob", wishlistProduce.getUser().getFirstName());
	}
	
	@Test
	@DisplayName("Test: WishlistProduce to Produce relational mapping")
	void test3(){
		assertNotNull(wishlistProduce.getProduce());
		assertEquals("Carrot", wishlistProduce.getProduce().getName());
	}

}
