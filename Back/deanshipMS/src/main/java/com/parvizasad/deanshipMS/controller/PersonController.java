package com.parvizasad.deanshipMS.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Person;
import com.parvizasad.deanshipMS.service.PersonService;

@CrossOrigin(origins = { "*" },  allowCredentials = "false")
@RestController
@RequestMapping("/persons")
public class PersonController {

	private PersonService personService;

	public PersonController(PersonService personService) {
		this.personService = personService;
	}

	@GetMapping
	public List<Person> getAllUsers() {
		return personService.getAllPersons();
	}

	@PostMapping
	public ResponseEntity<Object> createPerson(@RequestBody Person newUser) {
		return personService.createPerson(newUser);
	}

	@GetMapping("/{personId}")
	public Person getById(@PathVariable Long personId) {
		return personService.getById(personId);
	}

	@PutMapping("/{personId}")
	public ResponseEntity<Object> updatePerson(@PathVariable Long personId, @RequestBody Person newPerson) {
		return personService.updatePerson(personId, newPerson);
	}

	@DeleteMapping("/{personId}")
	public void deleteUser(@PathVariable Long personId) {
		personService.deleteById(personId);
	}

}
