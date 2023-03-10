package com.parvizasad.deanshipMS.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "person")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Person {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String pasportId;
	public String fullName;
	public Date birthDate;
	public String phno;
	@Email
	public String email;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="gender_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Gender gender;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="location_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Location location;
	
	@NotNull
	public boolean isDelete = false;

}
