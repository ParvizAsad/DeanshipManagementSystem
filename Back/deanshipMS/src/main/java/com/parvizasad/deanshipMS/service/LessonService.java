package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Lesson;
import com.parvizasad.deanshipMS.repository.LessonRepository;

@Service
public class LessonService {
	private LessonRepository lessonRepository;

	public LessonService(LessonRepository lessonRepository) {
		this.lessonRepository = lessonRepository;
	}

	public List<Lesson> getAllLessons() {
		List<Lesson> existLesson = new ArrayList<>();
		for (Lesson lesson : lessonRepository.findAll()) {
			if (lesson.isDelete == false) {
				existLesson.add(lesson);
			}
		}
		return existLesson;
	}

	@Transactional
	public ResponseEntity<Object> createLesson(Lesson newLesson) {
		if (lessonRepository.existsCurrentLessonByName(newLesson.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu dərs artıq yaradılıb!");
		} else {
			lessonRepository.save(newLesson);
			return ResponseEntity.ok("");
		}
	}

	public ResponseEntity<Object> getById(Long lessonId) {
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		if (lesson != null && lesson.isDelete == false) {
			return new ResponseEntity<Object>(lesson, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dərs tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateLesson(Long lessonId, Lesson newLesson) {
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		Lesson existLesson = lessonRepository.findByName(newLesson.name).orElse(null);
		if (lesson != null && lesson.isDelete == false) {
			if (existLesson == null) {
				lesson.name = newLesson.name;
				lessonRepository.save(lesson);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existLesson.id != lessonId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda ixtisas mövcuddur!");
				} else {
					lesson.name = newLesson.name;
					lessonRepository.save(lesson);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}

		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dərs tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long lessonId) {
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		if (lesson != null) {
			lesson.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda Dərs mövcud deyildir!");
		}
	}
}
