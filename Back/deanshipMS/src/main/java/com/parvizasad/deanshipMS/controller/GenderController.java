package com.parvizasad.deanshipMS.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Gender;
import com.parvizasad.deanshipMS.service.GenderService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/genders")
public class GenderController {
	private GenderService genderService;

	public GenderController(GenderService genderService) {
		this.genderService = genderService;
	}

	@GetMapping
	public List<Gender> getAllGender() {
		return genderService.getAllGender();
	}
	
	@GetMapping("/passivGender")
	public List<Gender> getAllPassivGender() {
		return genderService.getAllPassivGender();
	}
	
	@GetMapping("/activeGender")
	public List<Gender> getAllActiveGender() {
		return genderService.getAllActiveGender();
	}

	@PostMapping
	public Object createGender(@RequestBody Gender newGender) {
		return genderService.createGender(newGender);
	}
	
	@GetMapping("/{genderId}")
	public Object getById(@PathVariable Long genderId) {
		return genderService.getById(genderId);
	}

	@PutMapping("/{genderId}")
	public Object updateGender(@PathVariable Long genderId, @RequestBody Gender newGender) {
		return genderService.updateGender(genderId, newGender);
	}

	@DeleteMapping("/{genderId}")
	public Object deleteGender(@PathVariable Long genderId) {
	return genderService.deleteById(genderId);
	}

}
