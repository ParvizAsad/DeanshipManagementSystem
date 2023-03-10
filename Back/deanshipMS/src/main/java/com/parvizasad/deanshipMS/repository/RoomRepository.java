package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	boolean existsCurrentRoomByRoomNumber(String roomNumber);

	Optional<Room> findByRoomNumber(String roomNumber);
}
