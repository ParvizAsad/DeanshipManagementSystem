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
		if (newDepartment.name.length() != 0) {
			if (existingDepartment == null) {
				departmentRepository.save(newDepartment);
				return HttpStatus.OK;
			} else {
				return HttpStatus.BAD_REQUEST;
			}
		} else
			return HttpStatus.NOT_FOUND;
	}


	public Object getById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		if (department != null) {
			return department;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}
	
	public Object updateDepartment(Long departmentId, Department newDepartment) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		Department existDepartment = departmentRepository.findByName(newDepartment.name).orElse(null);
		if (department != null) {
			if (existDepartment == null) {
				if (newDepartment.name.length() != 0) {
					department.name = newDepartment.name;
					departmentRepository.save(department);
					return HttpStatus.OK;
				} else {
					return HttpStatus.BAD_REQUEST;
				}
			} else {
				if (existDepartment.id != departmentId) {
					return HttpStatus.BAD_REQUEST;// mövcuddur
				} else {
					department.name = newDepartment.name;
					departmentRepository.save(department);
					return HttpStatus.OK;
				}
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapılmadı
		}
	}
	

	public Object deleteById(Long departmentId) {
		Department department = departmentRepository.findById(departmentId).orElse(null);
		if (department != null) {
			if (!department.isDeleted()) {
				department.setDeleted(true);
				departmentRepository.save(department);
				return HttpStatus.OK;
			} else {
				department.setDeleted(false);
				departmentRepository.save(department);
				return HttpStatus.OK;
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	}

}
