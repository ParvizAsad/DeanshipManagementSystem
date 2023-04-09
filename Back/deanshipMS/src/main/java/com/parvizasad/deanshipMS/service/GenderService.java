package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<Gender> genderList = genderRepository.findAll();
		return genderList;
	}

	public List<Gender> getAllActiveGender() {
		List<Gender> activeGenderList = new ArrayList<Gender>();
		for (Gender gender : genderRepository.findAll()) {
			if (!gender.isDelete) {
				activeGenderList.add(gender);
			}
		}
		return activeGenderList;
	}
	
	public List<Gender> getAllPassivGender() {
		List<Gender> passivGenderList =new ArrayList<Gender>();
		for (Gender gender : genderRepository.findAll()) {
			if (gender.isDelete) {
				passivGenderList.add(gender);
			}
		}
		return passivGenderList;
	}

	public Object createGender(Gender newGender) {
		Gender existingGender = genderRepository.findByName(newGender.getName()).orElse(null);
		
		if (newGender.name.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingGender != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		genderRepository.save(newGender);
		return HttpStatus.OK;
	}

	public Object getById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		if (gender == null) {
			return HttpStatus.NOT_FOUND;
		} 
			return gender;
	}
	
	public Object updateGender(Long  genderId, Gender newGender) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		Gender existGender = genderRepository.findByName(newGender.name).orElse(null);
		
		if (gender == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newGender.name.length() == 0 || (existGender != null && (existGender.id != genderId))) {
			return HttpStatus.BAD_REQUEST;
		}

		gender.name = newGender.name;
		genderRepository.save(gender);
		return HttpStatus.OK;
		
	}

	public Object deleteById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		
		if (gender == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		gender.setDelete(!gender.isDelete());
		genderRepository.save(gender);
		return HttpStatus.OK;
		
	}

}
