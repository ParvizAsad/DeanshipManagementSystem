package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Department;
import com.parvizasad.deanshipMS.repository.DepartmentRepository;

@Service
public class DepartmentService {
	private DepartmentRepository departmentRepository;

	public DepartmentService(DepartmentRepository departmentRepository) {
		this.departmentRepository = departmentRepository;
	}

	public List<Department> getAllDepartment() {
		List<Department> allDepartmens = departmentRepository.findAll();
		return allDepartmens;
	}

	public List<Department> getAllActiveDepartment() {
		List<Department> activeDepartmentList =new ArrayList<Department>();
		for (Department department : departmentRepository.findAll()) {
			if (!department.isDeleted) {
				activeDepartmentList.add(department);
			}
		}
		return activeDepartmentList;
	}
	
	public List<Department> getAllPassivDepartment() {
		List<Department> passivDepartmentList =new ArrayList<Department>();
		for (Department department : departmentRepository.findAll()) {
			if (department.isDeleted) {
				passivDepartmentList.add(department);
			}
		}
		return passivDepartmentList;
	}
	
	public Object createDepartment(Department newDepartment) {
		Department existingDepartment = departmentRepository.findByName(newDepartment.getName()).orElse(null);
		
		if (newDepartment.name.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingDepartment != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		departmentRepository.save(newDepartment);
		return HttpStatus.OK;
		
	}


	public Object getById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		
		if (department == null) {
			return HttpStatus.NOT_FOUND;
		} 
			return department;
	}
	
	public Object updateDepartment(Long departmentId, Department newDepartment) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		Department existDepartment = departmentRepository.findByName(newDepartment.name).orElse(null);
		
		if (department == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newDepartment.name.length() == 0 || (existDepartment != null && (existDepartment.id != departmentId))) {
			return HttpStatus.BAD_REQUEST;
		}

		department.name = newDepartment.name;
		departmentRepository.save(department);
		return HttpStatus.OK;
	}
	

	public Object deleteById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		if (department == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		department.setDeleted(!department.isDeleted());
		departmentRepository.save(department);
		return HttpStatus.OK;
	}

}
