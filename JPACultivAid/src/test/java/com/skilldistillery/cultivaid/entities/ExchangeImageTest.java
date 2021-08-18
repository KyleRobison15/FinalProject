package com.skilldistillery.cultivaid.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ExchangeImageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private ExchangeImage exImg; //Entity under test
	
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
		exImg = em.find(ExchangeImage.class, 1); // Before each test get the User entity to test (test subject)
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close(); // After each test close the EM
		exImg = null; // After each test set user back to null to prevent cross contamination between tests
	}
	
	@Test
	@DisplayName("TEST: ExchangeImage Basic Mappings")
	void test1() {
		assertNotNull(exImg);
		assertEquals("https://burea-uinsurance.com/en/wp-content/uploads/2019/11/how-much-does-a-medium-sized-carrot-weigh.jpg",
				exImg.getImageUrl());

	}

}
