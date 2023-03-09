package com.parvizasad.deanshipMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
