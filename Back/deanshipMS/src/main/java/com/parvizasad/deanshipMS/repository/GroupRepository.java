package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
	boolean existsCurrentGroupByName(String name);

	Optional<Group> findByName(String name);
}
