package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Major;
import com.parvizasad.deanshipMS.repository.MajorRepository;

@Service
public class MajorService {
	private MajorRepository majorRepository;

	public MajorService(MajorRepository majorRepository) {
		this.majorRepository = majorRepository;
	}

	public List<Major> getAllMajors() {
		List<Major> majorList = majorRepository.findAll();
		return majorList;
	}

	public List<Major> getAllActiveMajors() {
		List<Major> activeMajorList = new ArrayList<Major>();
		for (Major major : majorRepository.findAll()) {
			if (!major.isDelete) {
				activeMajorList.add(major);
			}
		}
		return activeMajorList;
	}

	public List<Major> getAllPassivMajors() {
		List<Major> passivMajorList = new ArrayList<Major>();
		for (Major major : majorRepository.findAll()) {
			if (major.isDelete) {
				passivMajorList.add(major);
			}
		}
		return passivMajorList;
	}

	public Object createMajor(Major newMajor) {
		Major existingMajorName = majorRepository.findByName(newMajor.getName()).orElse(null);
		Major existingMajorCode = majorRepository.findByMajorCode(newMajor.getMajorCode()).orElse(null);
		
		if (newMajor.name.length() == 0 && newMajor.majorCode.length() == 0) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingMajorName != null && existingMajorCode != null) {
			return HttpStatus.BAD_REQUEST;
		}
		majorRepository.save(newMajor);
		return HttpStatus.OK;

	}

	public Object getById(Long majorId) {
		Major major = majorRepository.findById(majorId).orElse(null);
		if (major == null) {
			return HttpStatus.NOT_FOUND;
		} 
			return major;
	}

	public Object updateMajor(Long majorId, Major newMajor) {
		Major major = majorRepository.findById(majorId).orElse(null);
		Major existMajor = majorRepository.findByName(newMajor.name).orElse(null);

		if (major == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newMajor.name.length() == 0 || (existMajor != null && (existMajor.id != majorId))) {
			return HttpStatus.BAD_REQUEST;
		}

		major.name = newMajor.name;
		major.majorCode=newMajor.majorCode;
		majorRepository.save(major);
		return HttpStatus.OK;
	}

	public Object deleteById(Long majorId) {
		Major major = majorRepository.findById(majorId).orElse(null);
		
		if (major == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
		
		if (!major.isDelete()) {
			major.setDelete(true);
		} else {
			major.setDelete(false);
		}
		
		majorRepository.save(major);
		return HttpStatus.OK;
		
	}
}
