package com.parvizasad.deanshipMS.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "department")
@Data
@Getter
@Setter
public class Department {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	@NotEmpty
	public String name;
	
	public boolean isDeleted = false;

}
