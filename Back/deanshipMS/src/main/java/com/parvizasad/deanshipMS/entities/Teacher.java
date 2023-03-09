package com.parvizasad.deanshipMS.entities;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="teacher")
@Data
@Getter
@Setter
public class Teacher  {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="person_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Person person;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="department_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Department department;
	
	String branch;
	
	
}
