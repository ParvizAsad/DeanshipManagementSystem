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

import com.parvizasad.deanshipMS.entities.Room;
import com.parvizasad.deanshipMS.service.RoomService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/room")
public class RoomController {
	private RoomService roomService;

	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	@GetMapping
	public List<Room> getAllRoom() {
		return roomService.getAllRoom();
	}
	@GetMapping("/passivRoom")
	public List<Room> getAllPassivRooms() {
		return roomService.getAllPassivRooms();
	}
	
	@GetMapping("/activeRoom")
	public List<Room> getAllActiveRooms() {
		return roomService.getAllActiveRooms();
	}
	
	@PostMapping
	public Object createRoom(@RequestBody Room newRoom) {
		return roomService.createRoom(newRoom);
	}

	@GetMapping("/{roomId}")
	public Object getById(@PathVariable Long roomId) {
		return roomService.getById(roomId);
	}

	@PutMapping("/{roomId}")
	public Object updateRoom(@PathVariable Long roomId, @RequestBody Room newRoom) {
		return roomService.updateRoom(roomId, newRoom);
	}

	@DeleteMapping("/{roomId}")
	public void deleteRoom(@PathVariable Long roomId) {
		roomService.deleteById(roomId);
	}
}
