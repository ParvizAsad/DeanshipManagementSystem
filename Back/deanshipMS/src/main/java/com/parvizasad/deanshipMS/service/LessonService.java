package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<Lesson> lessonList = lessonRepository.findAll();
		return lessonList;
	}

	public List<Lesson> getAllActiveLessons() {
		List<Lesson> activeLessonList = new ArrayList<Lesson>();
		for (Lesson lesson : lessonRepository.findAll()) {
			if (!lesson.isDelete) {
				activeLessonList.add(lesson);
			}
		}
		return activeLessonList;
	}

	public List<Lesson> getAllPassivLessons() {
		List<Lesson> passivLessonList = new ArrayList<Lesson>();
		for (Lesson lesson : lessonRepository.findAll()) {
			if (lesson.isDelete) {
				passivLessonList.add(lesson);
			}
		}
		return passivLessonList;
	}

	public Object createLesson(Lesson newLesson) {
		Lesson existingLesson = lessonRepository.findByName(newLesson.getName()).orElse(null);
		if (newLesson.name.length() != 0) {
			if (existingLesson == null) {
				lessonRepository.save(newLesson);
				return HttpStatus.OK;
			} else {
				return HttpStatus.BAD_REQUEST;
			}
		} else
			return HttpStatus.NOT_FOUND;
	}

	public Object getById(Long lessonId) {
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		if (lesson == null) {
			return lesson;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}

	public Object updateLesson(Long lessonId, Lesson newLesson) {
		
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		Lesson existLesson = lessonRepository.findByName(newLesson.name).orElse(null);

		if (lesson == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newLesson.name.length() == 0 || (existLesson != null && (existLesson.id != lessonId))) {
			return HttpStatus.BAD_REQUEST;
		}

		lesson.name = newLesson.name;
		lesson.creditCount = newLesson.creditCount;
		lesson.duration = newLesson.duration;
		lessonRepository.save(lesson);
		return HttpStatus.OK;
	}

	public Object deleteById(Long lessonId) {
		Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
		if (lesson != null) {
			if (!lesson.isDelete()) {
				lesson.setDelete(true);
				lessonRepository.save(lesson);
				return HttpStatus.OK;
			} else {
				lesson.setDelete(false);
				lessonRepository.save(lesson);
				return HttpStatus.OK;
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	}
}
