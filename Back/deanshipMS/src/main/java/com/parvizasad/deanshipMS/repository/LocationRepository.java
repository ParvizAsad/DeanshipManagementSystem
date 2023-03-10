package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{
	boolean existsCurrentLocationByName(String name);

	Optional<Location> findByName(String name);
}
