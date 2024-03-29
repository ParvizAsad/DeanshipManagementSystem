package com.parvizasad.deanshipMS.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Department;
import com.parvizasad.deanshipMS.service.DepartmentService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/department")
public class DepartmentController {
	private DepartmentService departmentService;

	public DepartmentController(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	@GetMapping
	public List<Department> getAllDepartment() {
		return departmentService.getAllDepartment();
	}
	
	@GetMapping("/passivDepartment")
	public List<Department> getAllPassivDepartment() {
		return departmentService.getAllPassivDepartment();
	}
	
	@GetMapping("/activeDepartment")
	public List<Department> getAllActiveDepartment() {
		return departmentService.getAllActiveDepartment();
	}

	@PostMapping
	public Object createDepartment(@RequestBody Department newDepartment) {
		return departmentService.createDepartment(newDepartment);
	}
	
	@GetMapping("/{departmentId}")
	public Object getById(@PathVariable Long departmentId) {
		return departmentService.getById(departmentId);
	}

	@PutMapping("/{departmentId}")
	public Object updateDepartment(@PathVariable Long departmentId, @RequestBody Department newDepartment) {
		return departmentService.updateDepartment(departmentId, newDepartment);
	}

	@DeleteMapping("/{departmentId}")
	public Object deleteDepartment(@PathVariable Long departmentId) {
		return	departmentService.deleteById(departmentId);
	}
}
