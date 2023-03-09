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

import com.parvizasad.deanshipMS.entities.Major;
import com.parvizasad.deanshipMS.service.MajorService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/majors")
public class MajorController {
	private MajorService majorService;

	public MajorController(MajorService majorService) {
		this.majorService = majorService;
	}

	@GetMapping
	public List<Major> getAllMajors() {
		return majorService.getAllMajors();
	}

	@PostMapping
	public ResponseEntity<Object> createMajor(@RequestBody Major newMajor) {
		return majorService.createMajor(newMajor);
	}

	@GetMapping("/{majorId}")
	public ResponseEntity<Object> getById(@PathVariable Long majorId) {
		return majorService.getById(majorId);
	}

	@PutMapping("/{majorId}")
	public ResponseEntity<Object> updateMajor(@PathVariable Long majorId, @RequestBody Major newMajor) {
		return majorService.updateMajor(majorId, newMajor);
	}

	@DeleteMapping("/{majorId}")
	public void deleteMajor(@PathVariable Long majorId) {
		majorService.deleteById(majorId);
	}
}
