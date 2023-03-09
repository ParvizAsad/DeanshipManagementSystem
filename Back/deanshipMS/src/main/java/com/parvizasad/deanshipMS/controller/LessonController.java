package com.parvizasad.deanshipMS.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Lesson;
import com.parvizasad.deanshipMS.service.LessonService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/lessons")
public class LessonController {
	private LessonService lessonService;

	public LessonController(LessonService lessonService) {
		this.lessonService = lessonService;
	}

	@GetMapping
	public List<Lesson> getAllLessons() {
		return lessonService.getAllLessons();
	}

	@PostMapping
	public ResponseEntity<Object> createLesson(@RequestBody Lesson newLesson) {
		return lessonService.createLesson(newLesson);
	}

	@GetMapping("/{lessonId}")
	public ResponseEntity<Object> getById(@PathVariable Long lessonId) {
		return lessonService.getById(lessonId);
	}

	@PutMapping("/{lessonId}")
	public ResponseEntity<Object> updateLesson(@PathVariable Long lessonId, @RequestBody Lesson newLesson) {
		return lessonService.updateLesson(lessonId, newLesson);
	}

	@DeleteMapping("/{lessonId}")
	public void deleteLesson(@PathVariable Long lessonId) {
		lessonService.deleteById(lessonId);
	}

}
