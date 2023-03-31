package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<Room> room = roomRepository.findAll();
		return room;
	}

	public List<Room> getAllActiveRooms() {
		List<Room> activeRoomList = new ArrayList<Room>();
		for (Room room : roomRepository.findAll()) {
			if (!room.isDelete) {
				activeRoomList.add(room);
			}
		}
		return activeRoomList;
	}

	public List<Room> getAllPassivRooms() {
		List<Room> passivRoomList = new ArrayList<Room>();
		for (Room room : roomRepository.findAll()) {
			if (room.isDelete) {
				passivRoomList.add(room);
			}
		}
		return passivRoomList;
	}

	public Object createRoom(Room newRoom) {
		Room existingRoom = roomRepository.findByRoomNumber(newRoom.getRoomNumber()).orElse(null);

		if (newRoom.roomNumber.length() == 0) {
			return HttpStatus.NOT_FOUND;
		}

		if (existingRoom != null) {
			return HttpStatus.BAD_REQUEST;
		}
		roomRepository.save(newRoom);
		return HttpStatus.OK;
	}

	public Object getById(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		if (room != null) {
			return HttpStatus.NOT_FOUND;
		}
		return room;
	}

	public Object updateRoom(Long roomId, Room newRoom) {
		Room room = roomRepository.findById(roomId).orElse(null);
		Room existRoom = roomRepository.findByRoomNumber(newRoom.roomNumber).orElse(null);

		if (room == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newRoom.roomNumber.length() == 0 || (existRoom != null && (existRoom.id != roomId))) {
			return HttpStatus.BAD_REQUEST;
		}

		room.roomNumber = newRoom.roomNumber;
		roomRepository.save(room);
		return HttpStatus.OK;
	}

	public Object deleteById(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);

		if (room == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}

		room.setDelete(!room.isDelete());
		roomRepository.save(room);
		return HttpStatus.OK;
	}

}
