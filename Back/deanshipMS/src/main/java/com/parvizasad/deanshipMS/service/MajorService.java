package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
		List<Major> existMajor = new ArrayList<>();
		for(Major major : majorRepository.findAll()) {
			if(major.isDelete==false) {
				existMajor.add(major);
			}
		}
		return existMajor;
	}

	@Transactional
	public ResponseEntity<Object> createMajor(Major newMajor) {
		if (majorRepository.existsCurrentMajorByName(newMajor.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu ixtisas artıq yaradılıb!");
		} else {
			majorRepository.save(newMajor);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object>  getById(Long majorId) {
		Major major = majorRepository.findById(majorId).orElse(null);
		if (major != null && major.isDelete==false) {
			return new ResponseEntity<Object>(major, HttpStatus.OK);
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("İxtisas tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateMajor(Long majorId, Major newMajor) {
		Major major = majorRepository.findById(majorId).orElse(null);
		Major existMajor = majorRepository.findByName(newMajor.name).orElse(null);
		Major existMajorCode = majorRepository.findByMajorCode(newMajor.majorCode).orElse(null);
		if (major != null && major.isDelete==false) {
			if(existMajor == null && existMajorCode==null) {
				major.name = newMajor.name;
				major.majorCode=newMajor.majorCode;
				majorRepository.save(major);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			}
			else {
				if ( existMajor.id != majorId && existMajorCode.majorCode != major.majorCode ) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda ixtisas mövcuddur!");
				} else {
					major.name = newMajor.name;
					majorRepository.save(major);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
			
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("İxtisas tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long majorId) {
		Major major =  majorRepository.findById(majorId).orElse(null);
		if (major != null) {
			major.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda ixtisas mövcud deyildir!");
		}
	}
}
