package com.skilldistillery.cultivaid.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.cultivaid.entities.Produce;
import com.skilldistillery.cultivaid.services.ProduceService;

@RestController
@CrossOrigin({"*", "http://localhost:4210"})
public class ProduceController {
	
	@Autowired
	private ProduceService produceSvc; 
	
	@GetMapping("api/produce")
	public List<Produce> index(HttpServletResponse res, Principal principal) {
		
		List<Produce> produce = produceSvc.index(principal.getName());
		
		if(produce == null) {
			res.setStatus(404); 
		}
		
		return produce;
	}
	
	@GetMapping("produce")
	public double getWasteSaved(HttpServletResponse res) {
		return produceSvc.calculateWastePrevented();
	}
	
	@PostMapping("api/produce")
	public Produce create(
			HttpServletResponse res,
			HttpServletResponse req,
			Principal principal,
			@RequestBody Produce produce
			) {
		
		return produceSvc.create(principal.getName(), produce);
	}
	
	@PutMapping("api/produce")
	public Produce update (
		Principal principal,
		@RequestBody Produce produce
		) {	

		return produceSvc.update(principal.getName(), produce);
	}
	
	
	
}
