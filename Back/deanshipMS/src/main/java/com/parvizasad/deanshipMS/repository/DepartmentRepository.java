package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
	boolean existsCurrentDepartmentByName(String name);

	Optional<Department> findByName(String name);
}
