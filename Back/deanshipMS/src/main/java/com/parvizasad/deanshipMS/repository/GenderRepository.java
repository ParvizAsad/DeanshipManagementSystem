package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Gender;

public interface GenderRepository extends JpaRepository<Gender, Long> {
	boolean existsCurrentGenderByName(String name);

	Optional<Gender> findByName(String name);
}
