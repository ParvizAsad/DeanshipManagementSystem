package com.parvizasad.deanshipMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Employee;

public interface EmpoyeeRepository extends JpaRepository<Employee, Long> {

}
