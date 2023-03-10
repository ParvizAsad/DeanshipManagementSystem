package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.RoomType;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
	boolean existsCurrentRoomTypeByName(String name);

	Optional<RoomType> findByName(String name);
}
