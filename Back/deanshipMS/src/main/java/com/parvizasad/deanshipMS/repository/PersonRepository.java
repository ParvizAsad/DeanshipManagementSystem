package com.parvizasad.deanshipMS.repository;

import javax.validation.constraints.Email;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

	Person findByPasportId(String pasportId);

	boolean existsCurrentPersonByPasportId(String pasportId);

	boolean existsCurrentPersonByEmail( String email);

	Person findByEmail(@Email String email);

}
