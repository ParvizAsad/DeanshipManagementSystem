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

import com.parvizasad.deanshipMS.entities.RoomType;
import com.parvizasad.deanshipMS.service.RoomTypeService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/roomTypes")
public class RoomTypeController {
	private RoomTypeService roomTypeService;

	public RoomTypeController(RoomTypeService roomTypeService) {
		this.roomTypeService = roomTypeService;
	}

	@GetMapping
	public List<RoomType> getAllRoomType() {
		return roomTypeService.getAllRoomType();
	}

	@PostMapping
	public ResponseEntity<Object> createRoomType(@RequestBody RoomType newRoomType) {
		return roomTypeService.createRoomType(newRoomType);
	}

	@GetMapping("/{roonTypeId}")
	public ResponseEntity<Object> getById(@PathVariable Long roomTypeId) {
		return roomTypeService.getById(roomTypeId);
	}

	@PutMapping("/{roonTypeId}")
	public ResponseEntity<Object> updateRoomType(@PathVariable Long roomTypeId, @RequestBody RoomType newRoomType) {
		return roomTypeService.updateRoomType(roomTypeId, newRoomType);
	}

	@DeleteMapping("/{roonTypeId}")
	public void deleteRoomType(@PathVariable Long roomTypeId) {
		roomTypeService.deleteById(roomTypeId);
	}

}
