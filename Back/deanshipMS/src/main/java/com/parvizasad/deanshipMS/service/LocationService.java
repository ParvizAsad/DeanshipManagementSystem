package com.parvizasad.deanshipMS.service;

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
		List<Location> Location =  locationRepository.findAll();
//		for (Location location : locationRepository.findAll()) {
//			if (location.isDelete == false) {
//				Location.add(location);
//			}
//		}
		return Location;
	}

	public Object createLocation(Location newLocation) {
		Location existingLocation = locationRepository.findByName(newLocation.getName()).orElse(null);
	    if(newLocation.name.length() != 0 ){
	    	if(existingLocation == null) {
	    			locationRepository.save(newLocation);
	    		return HttpStatus.OK;
	    	}
	    	else {
	    		return  HttpStatus.BAD_REQUEST;
	    	}
	    }
	    else return  HttpStatus.NOT_FOUND;
		
	
	}
	
	public Object getById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null && location.isDelete == false) {
			return location;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}
	
	public Object updateLocation(Long locationId, Location newLocation) {
		Location location = locationRepository.findById(locationId).orElse(null);
		Location existLocation = locationRepository.findByName(newLocation.name).orElse(null);
		if (location != null && location.isDelete == false) {
			if (existLocation == null) {
				location.name = newLocation.name;
				locationRepository.save(location);
				return HttpStatus.OK;
			} else {
				if (existLocation.id != locationId) {
					return HttpStatus.BAD_REQUEST;//mövcuddur
				} else {
					location.name = newLocation.name;
					locationRepository.save(location);
					return HttpStatus.OK;
				}
			}
		} else {
			return HttpStatus.NOT_FOUND;//tapılmadı
		}
	}

	public Object deleteById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null) {
			location.isDelete = true;
			return HttpStatus.OK;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}
	
}
