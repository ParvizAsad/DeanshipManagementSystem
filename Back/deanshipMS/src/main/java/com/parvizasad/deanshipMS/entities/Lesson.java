package com.parvizasad.deanshipMS.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "lesson")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Lesson {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;

	public String name;
	public int creditCount;
	public int duration;
	public boolean isDelete = Boolean.FALSE;

}
