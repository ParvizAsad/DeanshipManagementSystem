package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Degree;
import com.parvizasad.deanshipMS.repository.DegreeRepository;

@Service
public class DegreeService {

	private DegreeRepository degreeRepository;

	public DegreeService(DegreeRepository degreeRepository) {
		this.degreeRepository = degreeRepository;
	}

	public List<Degree> getAllDegrees() {
		List<Degree> degree = degreeRepository.findAll();
		return degree;
	}

	public List<Degree> getAllActiveDegrees() {
		List<Degree> activeDegreeList = new ArrayList<Degree>();
		for (Degree degree : degreeRepository.findAll()) {
			if (!degree.isDelete) {
				activeDegreeList.add(degree);
			}
		}
		return activeDegreeList;
	}

	public List<Degree> getAllPassivDegrees() {
		List<Degree> passivDegreeList = new ArrayList<Degree>();
		for (Degree degree : degreeRepository.findAll()) {
			if (degree.isDelete) {
				passivDegreeList.add(degree);
			}
		}
		return passivDegreeList;
	}

	public Object createDegree(Degree newDegree) {
		Degree existingDegree = degreeRepository.findByName(newDegree.getName()).orElse(null);

		if (newDegree.name.length() == 0) {
			return HttpStatus.NOT_FOUND;
		}

		if (existingDegree != null) {
			return HttpStatus.BAD_REQUEST;
		}
		degreeRepository.save(newDegree);
		return HttpStatus.OK;
	}

	public Object getById(Long degreeId) {
		Degree degree = degreeRepository.findById(degreeId).orElse(null);
		if (degree == null) {
			return HttpStatus.NOT_FOUND;
		}
		return degree;
	}

	public Object updateDegree(Long degreeId, Degree newDegree) {
		Degree degree = degreeRepository.findById(degreeId).orElse(null);
		Degree existDegree = degreeRepository.findByName(newDegree.name).orElse(null);

		if (degree == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newDegree.name.length() == 0 || (existDegree != null && (existDegree.id != degreeId))) {
			return HttpStatus.BAD_REQUEST;
		}

		degree.name = newDegree.name;
		degreeRepository.save(degree);
		return HttpStatus.OK;
	}

	public Object deleteById(Long degreeId) {
		Degree degree = degreeRepository.findById(degreeId).orElse(null);

		if (degree == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}

		degree.setDelete(!degree.isDelete());
		degreeRepository.save(degree);
		return HttpStatus.OK;
	}
}
