package com.parvizasad.deanshipMS.entities;

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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="schedule")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="group_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Group group;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="lesson_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Lesson lesson;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="teacher_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Teacher teacher;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="room_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	Room room;
}
