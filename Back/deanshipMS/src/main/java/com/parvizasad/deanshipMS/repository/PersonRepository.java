package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

	
//	boolean existsCurrentPersonByName(String name);
//
//	Optional<Person> findByName(String name);

	Optional<Person> findByPasportId(String pasportId);
}
