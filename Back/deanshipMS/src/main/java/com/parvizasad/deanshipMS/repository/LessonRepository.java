package com.parvizasad.deanshipMS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parvizasad.deanshipMS.entities.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
