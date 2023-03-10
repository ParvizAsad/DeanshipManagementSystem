package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Gender;
import com.parvizasad.deanshipMS.repository.GenderRepository;

@Service
public class GenderService {
	private GenderRepository genderRepository;

	public GenderService(GenderRepository genderRepository) {
		this.genderRepository = genderRepository;
	}

	public List<Gender> getAllGender() {
		List<Gender> existGender = new ArrayList<>();
		for (Gender gender : genderRepository.findAll()) {
			if (gender.isDelete == false) {
				existGender.add(gender);
			}
		}
		return existGender;
	}

	@Transactional
	public ResponseEntity<Object> createGender(Gender newGender) {
		if (genderRepository.existsCurrentGenderByName(newGender.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu gender artıq yaradılıb!");
		} else {
			genderRepository.save(newGender);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		if (gender != null && gender.isDelete == false) {
			return new ResponseEntity<Object>(gender, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Gender tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateGender(Long genderId, Gender newGender) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		Gender existGender = genderRepository.findByName(newGender.name).orElse(null);
		if (gender != null && gender.isDelete == false) {
			if (existGender == null) {
				gender.name = newGender.name;
				genderRepository.save(existGender);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existGender.id != genderId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu gender mövcuddur!");
				} else {
					gender.name = newGender.name;
					genderRepository.save(gender);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Gender tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		if (gender != null) {
			gender.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda Gender mövcud deyildir!");
		}
	}
}
