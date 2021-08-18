package com.skilldistillery.cultivaid.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDateTime;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GardenItemCommentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private GardenItemComment gic; //Entity under test
	
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
		gic = em.find(GardenItemComment.class, 1); // Before each test get the User entity to test (test subject)
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close(); // After each test close the EM
		gic = null; // After each test set user back to null to prevent cross contamination between tests
	}
	
	@Test
	@DisplayName("TEST: GardenItemComment Basic Mappings")
	void test1() {
		assertNotNull(gic);
		assertEquals("Wow these carrots look great.", gic.getContent());
		assertEquals(LocalDateTime.of(2021, 8, 17, 0, 0, 0), gic.getCreatedDate());

	}
	
	@Test
	@DisplayName("TEST: Many GardenItemComment to One GardenItem Mapping")
	void test2() {
		assertNotNull(gic);
		GardenItem gi = gic.getGardenItem();
		assertNotNull(gi);
		assertEquals(1, gi.getId());
		assertEquals("Some delicious carrots.", gi.getDescription());
	}
	
	
	// Additional inserts added to DB for testing for TEST3 and TEST4
	// Comment ID 1 is NOT in reply to any other comments
	// Comment ID 2 is a reply to comment id 1
	// Comment ID 3 is a reply to comment id 1 (a reply to comment 2 but the top level comment is #1)
	@Test
	@DisplayName("TEST: One GardenItemComment to Many GardenItemComments (replies)")
	void test3() {
		assertNotNull(gic.getReplies());
		assertEquals(2, gic.getReplies().size());
		assertEquals("a reply to the reply", gic.getReplies().get(1).getContent());
	}
	
	@Test
	@DisplayName("TEST: Many GardenItemComments to One GardenItemComment (the comment replied to)")
	void test4() {
		assertNull(gic.getInReplyToComment());
		GardenItemComment gic2 = em.find(GardenItemComment.class, 2);
		assertEquals(1, gic2.getInReplyToComment().getId());
		assertEquals("Wow these carrots look great.", gic2.getInReplyToComment().getContent());
	}
	
	@Test
	@DisplayName("TEST: Many GardenItemComments to One User Mapping")
	void test5() {
		assertNotNull(gic);
		assertEquals("admin2", gic.getLeftByUser().getUsername());
	}
}
