package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Degree;

public interface DegreeRepository extends JpaRepository<Degree, Long> {
	boolean existsCurrentDegreeByName(String name);
	Optional<Degree> findByName(String name);
}
