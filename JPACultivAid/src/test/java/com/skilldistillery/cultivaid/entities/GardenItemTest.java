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

class GardenItemTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private GardenItem gi; //Entity under test
	
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
		gi = em.find(GardenItem.class, 1); // Before each test get the User entity to test (test subject)
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close(); // After each test close the EM
		gi = null; // After each test set user back to null to prevent cross contamination between tests
	}
	
	@Test
	@DisplayName("TEST: GardenItem Basic Mappings")
	void test1() {
		assertNotNull(gi);
		assertEquals("Some delicious carrots.", gi.getDescription());
		assertEquals("Fast", gi.getGrowMethod());
		assertEquals("2021-08-17", gi.getDateExpected());
		assertEquals(15, gi.getAmount());
		assertEquals("baby", gi.getVariety());
		assertFalse(gi.isPesticides());
		assertFalse(gi.isFertilizers());
		assertEquals(2021, gi.getCreatedDate().getYear());
		assertEquals(8, gi.getCreatedDate().getMonthValue());
		assertEquals(17, gi.getCreatedDate().getDayOfMonth());
	}
	
	
	// Tested w/ additional garden item comments as described in GardenItemCommentTest
	@Test
	@DisplayName("TEST: One GardenItem to Many GardenItemComment Mappings")
	void test2() {
		assertNotNull(gi);
		assertEquals(3, gi.getGardenItemComments().size());

	}
	
	@Test
	@DisplayName("TEST: Add/Remove GardenItemComment to GardenItem")
	void test3() {
		GardenItemComment gic = new GardenItemComment();
		gi.addGardenItemComment(gic);
		assertTrue(gi.getGardenItemComments().contains(gic));
		gi.removeGardenItemComment(gic);
		assertFalse(gi.getGardenItemComments().contains(gic));
	}

	@Test
	@DisplayName("TEST: Many GardenItems to One User Mapping")
	void test4() {
		assertNotNull(gi);
		assertEquals("admin1", gi.getUser().getUsername());
	}
	
	@Test
	@DisplayName("TEST: Many GardenItem to One Produce Mapping")
	void test5() {
		assertNotNull(gi);
		assertEquals("Carrot", gi.getProduce().getName());
	}

	@Test	
	@DisplayName("Test GardenItem to ExchangeItem Mapping")
	void test6() {
		assertNotNull(gi.getExchangeItems().size());
		assertTrue(gi.getExchangeItems().size() > 0); 
		assertEquals(1, gi.getExchangeItems().size());
	}
}
