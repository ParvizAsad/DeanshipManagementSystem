package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Department;
import com.parvizasad.deanshipMS.repository.DepartmentRepository;

@Service
public class DepartmentService {
	private DepartmentRepository departmentRepository;

	public DepartmentService(DepartmentRepository departmentRepository) {
		this.departmentRepository = departmentRepository;
	}

	public List<Department> getAllDeparments() {
		List<Department> existDepartment = new ArrayList<>();
		for (Department department : departmentRepository.findAll()) {
			if (department.isDeleted == false) {
				existDepartment.add(department);
			}
		}
		return existDepartment;
	}

	@Transactional
	public ResponseEntity<Object> createDepartment(Department newDepartment) {
		if (departmentRepository.existsCurrentDepartmentByName(newDepartment.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu fakultə artıq yaradılıb!");
		} else {
			departmentRepository.save(newDepartment);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		if (department != null && department.isDeleted == false) {
			return new ResponseEntity<Object>(department, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Dərs tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updateDepartment(Long departmentId, Department newdeDepartment) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		Department existdepartment = departmentRepository.findByName(newdeDepartment.name).orElse(null);
		if (department != null && department.isDeleted == false) {
			if (existdepartment == null) {
				department.name = newdeDepartment.name;
				departmentRepository.save(department);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existdepartment.id != departmentId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda fakultə mövcuddur!");
				} else {
					department.name = newdeDepartment.name;
					departmentRepository.save(department);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}

		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Fakultə tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		if (department != null) {
			department.isDeleted = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda fakultə mövcud deyildir!");
		}
	}
}
