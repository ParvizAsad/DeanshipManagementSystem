package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<Location> Location = locationRepository.findAll();
		return Location;
	}

	public List<Location> getAllActiveLocation() {
		List<Location> activeLocationList =new ArrayList<Location>();
		for (Location location : locationRepository.findAll()) {
			if (!location.isDelete) {
				activeLocationList.add(location);
			}
		}
		return activeLocationList;
	}
	
	public List<Location> getAllPassivLocation() {
		List<Location> passivLocationList =new ArrayList<Location>();
		for (Location location : locationRepository.findAll()) {
			if (location.isDelete) {
				passivLocationList.add(location);
			}
		}
		return passivLocationList;
	}
	
	public Object createLocation(Location newLocation) {
		Location existingLocation = locationRepository.findByName(newLocation.getName()).orElse(null);
		
		if (newLocation.name.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingLocation != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		locationRepository.save(newLocation);
		return HttpStatus.OK;
	}

	public Object getById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null) {
			return HttpStatus.NOT_FOUND;
		} 
		return location;
	}

	public Object updateLocation(Long locationId, Location newLocation) {
		Location location = locationRepository.findById(locationId).orElse(null);
		Location existLocation = locationRepository.findByName(newLocation.name).orElse(null);
		
		if (location == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newLocation.name.length() == 0 || (existLocation != null && (existLocation.id != locationId))) {
			return HttpStatus.BAD_REQUEST;
		}

		location.name = newLocation.name;
		locationRepository.save(location);
		return HttpStatus.OK;
	}

	public Object deleteById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		
		if (location == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		location.setDelete(!location.isDelete());
		locationRepository.save(location);
		return HttpStatus.OK;
	}

}
