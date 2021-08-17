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

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user; //Entity under test
	
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
		user = em.find(User.class, 1); // Before each test get the User entity to test (test subject)
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close(); // After each test close the EM
		user = null; // After each test set user back to null to prevent cross contamination between tests
	}
	
	@Test
	@DisplayName("TEST: User Mappings")
	void test1() {
		assertNotNull(user);
		assertEquals("admin1", user.getUsername());

	}

}
