package com.parvizasad.deanshipMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
