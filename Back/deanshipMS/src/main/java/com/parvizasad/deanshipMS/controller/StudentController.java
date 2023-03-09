package com.parvizasad.deanshipMS.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class StudentController {

	@GetMapping
	public void test() {
		System.out.println("test");
	}
	
}
