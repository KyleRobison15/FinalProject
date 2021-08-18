package com.skilldistillery.cultivaid.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
		assertEquals("Bob", user.getFirstName());
		assertEquals("Smith", user.getLastName());
		assertEquals("bobsmith@example.com", user.getEmail());
		assertEquals("1234567890", user.getPhone());
		assertTrue(user.getActive());
		assertEquals("admin", user.getRole());
		assertEquals("https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg", user.getImageUrl());
	}
	
//	 Tested with user id# 2 & additional garden item comments as described in GardenItemCommentTest
	@Test
	@DisplayName("TEST: One User to Many GardenItemComments Mapping")
	void test2() {
		User user2 = em.find(User.class, 2);
		assertEquals("admin2", user2.getUsername());
		assertNotNull(user2.getGardenItemComments());
		assertEquals(2, user2.getGardenItemComments().size());
	}
	
	@Test
	@DisplayName("TEST: Add/Remove GardenItemComments")
	void test3() {
		assertNotNull(user);
		GardenItemComment gic = new GardenItemComment();
		user.addGardenItemComment(gic);
		assertTrue(user.getGardenItemComments().contains(gic));
		user.removeGardenItemComment(gic);
		assertFalse(user.getGardenItemComments().contains(gic));
	}
	
	@Test
	@DisplayName("TEST: One User to Many GardenItem Mapping")
	void test4() {
		assertNotNull(user.getGardenItems());
		assertEquals("Some delicious carrots.", user.getGardenItems().get(0).getDescription());
	}
	
	@Test
	@DisplayName("TEST: Add/Remove GardenItem")
	void test5() {
		assertNotNull(user);
		GardenItem gi = new GardenItem();
		user.addGardenItem(gi);
		assertTrue(user.getGardenItems().contains(gi));
		user.removeGardenItem(gi);
		assertFalse(user.getGardenItems().contains(gi));
	}
	
	@Test
	@DisplayName("TEST: User Address Mapping")
	void test6() {
		assertNotNull(user);
		assertEquals("1234 Admin Drive", user.getAddress().getAddress());
		
	}
	
	@Test
	@DisplayName("TEST: User Messaging Mappings")
	void test7() {
		User user2 = em.find(User.class, 2);
		assertNotNull(user);
		assertEquals("Hello CultivAid!", user.getSentMessages().get(0).getContent());
		assertEquals("Hello CultivAid!", user2.getReceivedMessages().get(0).getContent());
		
		assertEquals(2021, user.getSentMessages().get(0).getCreateTime().getYear());
		

		
	}
}
