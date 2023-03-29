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
@Table(name="room")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public	Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="roomType_id", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	RoomType roomType;
	
	public	String roomNumber;
	public	String capacity;
	public boolean isDelete=false;
}
