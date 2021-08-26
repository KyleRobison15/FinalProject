package com.skilldistillery.cultivaid.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Category;
import com.skilldistillery.cultivaid.services.CategoryService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class CategoryController {
	
	@Autowired 
	private CategoryService catSvc;
	
	@GetMapping("api/categories")
	public List<Category> index() {
		return catSvc.index();
	}

}
