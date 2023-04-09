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

import com.parvizasad.deanshipMS.entities.Position;
import com.parvizasad.deanshipMS.service.PositionService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/positions")
public class PositionController {
	private PositionService positionService;

	public PositionController(PositionService positionService) {
		this.positionService = positionService;
	}
	@GetMapping
	public List<Position> getAllPositions() {
		return positionService.getAllPositions();
	}
	
	@GetMapping("/passivPosition")
	public List<Position> getAllPassivGroup() {
		return positionService.getAllPassivPositions();
	}
	
	@GetMapping("/activePosition")
	public List<Position> getAllActiveGroup() {
		return positionService.getAllActivePositions();
	}
	
	@PostMapping
	public Object createPosition(@RequestBody Position newPosition) {
		return positionService.createPosition(newPosition);
	}

	@GetMapping("/{positionId}")
	public Object getById(@PathVariable Long positionId) {
		return positionService.getById(positionId);
	}
	
	@PutMapping("/{positionId}")
	public Object updatePosition(@PathVariable Long positionId, @RequestBody Position newPosition) {
		return positionService.updatePosition(positionId, newPosition);
	}
	
	@DeleteMapping("/{positionId}")
	public Object deleteMajor(@PathVariable Long positionId) {
		return positionService.deleteById(positionId);
	}
	
}
