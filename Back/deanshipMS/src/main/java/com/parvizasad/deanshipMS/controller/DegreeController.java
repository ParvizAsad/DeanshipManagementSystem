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

import com.parvizasad.deanshipMS.entities.Degree;
import com.parvizasad.deanshipMS.service.DegreeService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/degree")
public class DegreeController {

	private DegreeService degreeService;

	public DegreeController(DegreeService degreeService) {
		this.degreeService = degreeService;
	}

	@GetMapping
	public List<Degree> getAllDegrees() {
		return degreeService.getAllDegrees();
	}
	
	@GetMapping("/passivDegree")
	public List<Degree> getAllPassivDegrees() {
		return degreeService.getAllPassivDegrees();
	}
	
	@GetMapping("/activeDegree")
	public List<Degree> getAllActiveDegrees() {
		return degreeService.getAllActiveDegrees();
	}
	
	@PostMapping
	public Object createDegree(@RequestBody Degree newDegree) {
		return degreeService.createDegree(newDegree);
	}
	
	@GetMapping("/{degreeId}")
	public Object getById(@PathVariable Long degreeId) {
		return degreeService.getById(degreeId);
	}

	@PutMapping("/{degreeId}")
	public Object updateDegree(@PathVariable Long degreeId, @RequestBody Degree newDegree) {
		return degreeService.updateDegree(degreeId, newDegree);
	}

	@DeleteMapping("/{degreeId}")
	public Object deleteDegree(@PathVariable Long degreeId) {
	return degreeService.deleteById(degreeId);
	}
}
