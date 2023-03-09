package com.parvizasad.deanshipMS.service;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
		List<Position> existPosition = new ArrayList<>();
		for (Position position : positionRepository.findAll()) {
			if (position.isDelete() == false) {
				existPosition.add(position);
			}
		}
		return existPosition;
	}

	@Transactional
	public ResponseEntity<Object> createPosition(Position newPosition) {
		if (positionRepository.findByName(newPosition.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu Pozisya artıq yaradılıb!");
		} else {
			positionRepository.save(newPosition);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long positionId) {
		Position position = positionRepository.findById(positionId).orElse(null);
		if (position != null && position.isDelete == false) {
			return new ResponseEntity<Object>(position, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Pozisya tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updatePosition(Long positionId, Position newPosition) {
		Position position = positionRepository.findById(positionId).orElse(null);
		Position existPosition = positionRepository.existfindByName(newPosition.name).orElse(null);
		if (position != null && position.isDelete == false) {
			if (existPosition == null) {
				position.name = newPosition.name;
				positionRepository.save(position);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existPosition.id != positionId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda pozisya mövcuddur!");
				} else {
					position.name = newPosition.name;
					positionRepository.save(position);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("İxtisas tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long positionId) {
		Position position = positionRepository.findById(positionId).orElse(null);
		if (position != null) {
			position.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda pozisya mövcud deyildir!");
		}
	}
}