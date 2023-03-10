package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.RoomType;
import com.parvizasad.deanshipMS.repository.RoomTypeRepository;

@Service
public class RoomTypeService {

	private RoomTypeRepository roomTypeRepository;

	public RoomTypeService(RoomTypeRepository roomTypeRepository) {
		this.roomTypeRepository = roomTypeRepository;
	}

	public List<RoomType> getAllRoomType() {
		List<RoomType> existRoomType = new ArrayList<>();
		for (RoomType roomType : roomTypeRepository.findAll()) {
			if (roomType.isDelete == false) {
				existRoomType.add(roomType);
			}
		}
		return existRoomType;
	}

	@Transactional
	public ResponseEntity<Object> createRoomType(RoomType newRoomType) {
		if (roomTypeRepository.existsCurrentRoomTypeByName(newRoomType.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu dərs otaq tipi artıq yaradılıb!");
		} else {
			roomTypeRepository.save(newRoomType);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long roomTypeId) {
		RoomType roomType = roomTypeRepository.findById(roomTypeId).orElse(null);
		if (roomType != null && roomType.isDelete == false) {
			return new ResponseEntity<Object>(roomType, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("otaq tipi tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateRoomType(Long roonTypeId, RoomType newRoomType) {
		RoomType roomType = roomTypeRepository.findById(roonTypeId).orElse(null);
		RoomType existRoomType = roomTypeRepository.findByName(newRoomType.name).orElse(null);
		if (roomType != null && roomType.isDelete == false) {
			if (existRoomType == null) {
				roomType.name = newRoomType.name;
				roomTypeRepository.save(roomType);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existRoomType.id != roonTypeId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda otaq tipi mövcuddur!");
				} else {
					roomType.name = newRoomType.name;
					roomTypeRepository.save(roomType);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("otaq tipi tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long roomTypeId) {
		RoomType roomType = roomTypeRepository.findById(roomTypeId).orElse(null);
		if (roomType != null) {
			roomType.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda otaq tipi mövcud deyildir!");
		}
	}

}
