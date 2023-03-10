package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Room;
import com.parvizasad.deanshipMS.repository.RoomRepository;

@Service
public class RoomService {
	private RoomRepository roomRepository;

	public RoomService(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	public List<Room> getAllRoom() {
		List<Room> existRoom = new ArrayList<>();
		for (Room room : roomRepository.findAll()) {
			if (room.isDelete == false) {
				existRoom.add(room);
			}
		}
		return existRoom;
	}

	@Transactional
	public ResponseEntity<Object> createRoom(Room newRoom) {
		if (roomRepository.existsCurrentRoomByRoomNumber(newRoom.getRoomNumber())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu otaq artıq yaradılıb!");
		} else {
			roomRepository.save(newRoom);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null && room.isDelete == false) {
			return new ResponseEntity<Object>(room, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("otaq tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateRoom(Long roonId, Room newRoom) {
		Room room = roomRepository.findById(roonId).orElse(null);
		Room existRoom = roomRepository.findByRoomNumber(newRoom.roomNumber).orElse(null);
		if (room != null && room.isDelete == false) {
			if (existRoom == null) {
				room.roomNumber = newRoom.roomNumber;
				roomRepository.save(room);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existRoom.id != roonId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu otaq mövcuddur!");
				} else {
					room.roomNumber = newRoom.roomNumber;
					roomRepository.save(room);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("otaq tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			room.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda otaq mövcud deyildir!");
		}
	}
}
