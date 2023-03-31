package com.parvizasad.deanshipMS.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Position;
import com.parvizasad.deanshipMS.repository.PositionRepository;

@Service
public class PositionService {

	private PositionRepository positionRepository;

	public PositionService(PositionRepository positionRepository) {
		this.positionRepository = positionRepository;
	}

	
	public List<Position> getAllPositions() {
		List<Position> position = positionRepository.findAll();
		return position;
	}

	public List<Position> getAllActivePositions() {
		List<Position> activePositionList =new ArrayList<Position>();
		for (Position position : positionRepository.findAll()) {
			if (!position.isDelete) {
				activePositionList.add(position);
			}
		}
		return activePositionList;
	}
	
	public List<Position> getAllPassivPositions() {
		List<Position> passivPositionList =new ArrayList<Position>();
		for (Position position : positionRepository.findAll()) {
			if (position.isDelete) {
				passivPositionList.add(position);
			}
		}
		return passivPositionList;
	}
	
	public Object createPosition(Position newPosition) {
		Position existingPosition = positionRepository.findByName(newPosition.getName()).orElse(null);
		
		if (newPosition.name.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingPosition != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		positionRepository.save(newPosition);
		return HttpStatus.OK;
	}

	public Object getById(Long positionId) {
		Position position = positionRepository.findById(positionId).orElse(null);
		if (position != null) {
			return HttpStatus.NOT_FOUND;
		} 
		return position;
	}

	public Object updatePosition(Long positionId, Position newPosition) {
		Position position = positionRepository.findById(positionId).orElse(null);
		Position existPosition = positionRepository.findByName(newPosition.name).orElse(null);
		
		if (position == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newPosition.name.length() == 0 || (existPosition != null && (existPosition.id != positionId))) {
			return HttpStatus.BAD_REQUEST;
		}

		position.name = newPosition.name;
		positionRepository.save(position);
		return HttpStatus.OK;
	}
	
	public Object deleteById(Long positionId) {
		Position position = positionRepository.findById(positionId).orElse(null);
		
		if (position == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		position.setDelete(!position.isDelete());
		positionRepository.save(position);
		return HttpStatus.OK;
	}
}