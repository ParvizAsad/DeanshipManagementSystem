package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Location;
import com.parvizasad.deanshipMS.repository.LocationRepository;

@Service
public class LocationService {

	private LocationRepository locationRepository;

	public LocationService(LocationRepository locationRepository) {
		this.locationRepository = locationRepository;
	}
	
	public List<Location> getAllLocation() {
		List<Location> Location = new ArrayList<>();
		for (Location location : locationRepository.findAll()) {
			if (location.isDelete == false) {
				Location.add(location);
			}
		}
		return Location;
	}

	@Transactional
	public ResponseEntity<Object> createLocation(Location newLocation) {
		if (locationRepository.existsCurrentLocationByName(newLocation.getName())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu Location artıq yaradılıb!");
		} else {
			locationRepository.save(newLocation);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null && location.isDelete == false) {
			return new ResponseEntity<Object>(location, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Location tapılmadı!");
		}
	}
	
	@Transactional
	public ResponseEntity<Object> updateLocation(Long locationId, Location newLocation) {
		Location location = locationRepository.findById(locationId).orElse(null);
		Location existLocation = locationRepository.findByName(newLocation.name).orElse(null);
		if (location != null && location.isDelete == false) {
			if (existLocation == null) {
				location.name = newLocation.name;
				locationRepository.save(existLocation);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existLocation.id != locationId) {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu Location mövcuddur!");
				} else {
					location.name = newLocation.name;
					locationRepository.save(location);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Location tapılmadı!");
		}
	}

	public ResponseEntity<Object> deleteById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null) {
			location.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu adda location mövcud deyildir!");
		}
	}
	
}
