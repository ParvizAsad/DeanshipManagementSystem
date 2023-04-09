package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<RoomType> roomType = roomTypeRepository.findAll();
		return roomType;
	}

	public List<RoomType> getAllActiveRoomTypes() {
		List<RoomType> activeRoomTypeList = new ArrayList<RoomType>();
		for (RoomType roomType : roomTypeRepository.findAll()) {
			if (!roomType.isDelete) {
				activeRoomTypeList.add(roomType);
			}
		}
		return activeRoomTypeList;
	}

	public List<RoomType> getAllPassivRoomTypes() {
		List<RoomType> passivRoomTypeList = new ArrayList<RoomType>();
		for (RoomType roomType : roomTypeRepository.findAll()) {
			if (roomType.isDelete) {
				passivRoomTypeList.add(roomType);
			}
		}
		return passivRoomTypeList;
	}
	
	public Object createRoomType(RoomType newRoomType) {
		RoomType existingRoomType = roomTypeRepository.findByName(newRoomType.getName()).orElse(null);

		if (newRoomType.name.length() == 0) {
			return HttpStatus.NOT_FOUND;
		}

		if (existingRoomType != null) {
			return HttpStatus.BAD_REQUEST;
		}
		roomTypeRepository.save(newRoomType);
		return HttpStatus.OK;
	}

	public Object getById(Long roomTypeId) {
		RoomType roomType = roomTypeRepository.findById(roomTypeId).orElse(null);
		if (roomType == null) {
			return HttpStatus.NOT_FOUND;
		}
		return roomType;
	}

	public Object updateRoomType(Long roomTypeId, RoomType newRoomType) {
		RoomType roomType = roomTypeRepository.findById(roomTypeId).orElse(null);
		RoomType existRoomType = roomTypeRepository.findByName(newRoomType.name).orElse(null);

		if (roomType == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newRoomType.name.length() == 0 || (existRoomType != null && (existRoomType.id != roomTypeId))) {
			return HttpStatus.BAD_REQUEST;
		}

		roomType.name = newRoomType.name;
		roomTypeRepository.save(roomType);
		return HttpStatus.OK;
	}

	public Object deleteById(Long roomTypeId) {
		RoomType roomType = roomTypeRepository.findById(roomTypeId).orElse(null);

		if (roomType == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}

		roomType.setDelete(!roomType.isDelete());
		roomTypeRepository.save(roomType);
		return HttpStatus.OK;
	}

}
