package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Major;
import com.parvizasad.deanshipMS.entities.Position;

public interface PositionRepository extends JpaRepository<Position, Long> {

	boolean findByName(String name);
	Optional<Position> existfindByName(String name);
}
