package com.parvizasad.deanshipMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
	boolean existsCurrentLessonByName(String name);

	Optional<Lesson> findByName(String name);
}
