package com.parvizasad.deanshipMS.entities;
import lombok.AllArgsConstructor;
import lombok.Data;
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

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="student")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="person_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Person person;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="major_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Major major;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="group_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Group group;
	
	Double point;
	
	double GPA;
	
}
