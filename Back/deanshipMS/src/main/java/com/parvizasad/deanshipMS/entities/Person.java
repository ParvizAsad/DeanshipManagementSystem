package com.parvizasad.deanshipMS.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "person")
@Data
@Getter
@Setter
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String pasportId;
	public String fullName;
	public String location;
	public int age;
	public String phno;
	@Email
	public String email;
	@NotNull
	public boolean isDelete = false;

}
