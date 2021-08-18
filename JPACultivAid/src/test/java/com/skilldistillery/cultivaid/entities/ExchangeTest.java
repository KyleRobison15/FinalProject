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

class ExchangeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Exchange exchange;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPACultivAid"); // Before all tests - set up an EMF
		
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close(); // After all tests, close the EMF
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager(); // Before each test, get an EM
		exchange = em.find(Exchange.class, 1); // Before each test get the User entity to test (test subject)
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close(); // After each test close the EM
		exchange = null; // After each test set user back to null to prevent cross contamination between tests
	}
	
	@Test
	@DisplayName("Test Exchange Mapping")
	void test1() {
		assertNotNull(exchange);
		assertEquals("Fricken' amazing carrots!", exchange.getBuyerComment());
		assertEquals(5, exchange.getRating());
		assertEquals("Jane", exchange.getBuyer().getFirstName());
	}
	
	@Test
	@DisplayName("Test Exchange to ExchangeItem Mapping")
	void test2() {
		assertNotNull(exchange.getExchangeItems().size());
		assertTrue(exchange.getExchangeItems().size() > 0); 
		assertEquals(1, exchange.getExchangeItems().size());
	}
	
	@Test
	@DisplayName("Test One Exchange to Many ExchangeImage Mapping")
	void test3() {
		assertNotNull(exchange.getExchangeImages().size());
		assertTrue(exchange.getExchangeImages().size() > 0); 
		assertEquals(2, exchange.getExchangeImages().size());
	}
	
	@Test
	@DisplayName("TEST: Add/Remove ExchangeImage to Exchange")
	void test4() {
		ExchangeImage image = new ExchangeImage();
		exchange.addExchangeImage(image);
		assertTrue(exchange.getExchangeImages().contains(image));
		exchange.removeExchangeImage(image);
		assertFalse(exchange.getExchangeImages().contains(image));
	}

}
