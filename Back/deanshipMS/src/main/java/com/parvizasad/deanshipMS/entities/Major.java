package com.parvizasad.deanshipMS.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "major")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Major {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String name;
	public String majorCode;
	public boolean isDelete= Boolean.FALSE;

}
