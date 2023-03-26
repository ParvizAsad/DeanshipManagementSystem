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
		if (newGender.name.length() != 0) {
			if (existingGender == null) {
				genderRepository.save(newGender);
				return HttpStatus.OK;
			} else {
				return HttpStatus.BAD_REQUEST;
			}
		} else
			return HttpStatus.NOT_FOUND;
	}

	public Object getById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		if (gender != null && gender.isDelete == false) {
			return gender;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}
	
	public Object updateGender(Long  genderId, Gender newGender) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		Gender existGender = genderRepository.findByName(newGender.name).orElse(null);
		if (gender != null && gender.isDelete == false) {
			if (existGender == null) {
				if (newGender.name.length() != 0) {
					gender.name = newGender.name;
					genderRepository.save(gender);
					return HttpStatus.OK;
				} else {
					return HttpStatus.BAD_REQUEST;
				}
			} else {
				if (existGender.id != genderId) {
					return HttpStatus.BAD_REQUEST;// mövcuddur
				} else {
					gender.name = newGender.name;
					genderRepository.save(gender);
					return HttpStatus.OK;
				}
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapılmadı
		}
	}

	public Object deleteById(Long genderId) {
		Gender gender = genderRepository.findById(genderId).orElse(null);
		if (gender != null) {
			if (!gender.isDelete()) {
				System.out.println("false");
				gender.setDelete(true);
				genderRepository.save(gender);
				return HttpStatus.OK;
			} else {
				System.out.println("true");
				gender.setDelete(false);
				genderRepository.save(gender);
				return HttpStatus.OK;
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	}

}
