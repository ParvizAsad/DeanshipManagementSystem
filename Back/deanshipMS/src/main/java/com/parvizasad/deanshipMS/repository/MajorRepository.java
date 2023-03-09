package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Major;

public interface MajorRepository extends JpaRepository<Major, Long> {

	boolean existsCurrentMajorByName(String name);

	Optional<Major> findByName(String name);

	Optional<Major> findByMajorCode(String majorCode);

}