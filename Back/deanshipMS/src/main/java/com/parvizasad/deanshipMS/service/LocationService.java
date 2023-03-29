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
		if (newLocation.name.length() != 0) {
			if (existingLocation == null) {
				locationRepository.save(newLocation);
				return HttpStatus.OK;
			} else {
				return HttpStatus.BAD_REQUEST;
			}
		} else
			return HttpStatus.NOT_FOUND;
	}

	public Object getById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null) {
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
				if (newLocation.name.length() != 0) {
					location.name = newLocation.name;
					locationRepository.save(location);
					return HttpStatus.OK;
				} else {
					return HttpStatus.BAD_REQUEST;
				}
			} else {
				if (existLocation.id != locationId) {
					return HttpStatus.BAD_REQUEST;// mövcuddur
				} else {
					location.name = newLocation.name;
					locationRepository.save(location);
					return HttpStatus.OK;
				}
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapılmadı
		}
	}

	public Object deleteById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElse(null);
		if (location != null) {
			if (!location.isDelete()) {
				System.out.println("false");
				location.setDelete(true);
				locationRepository.save(location);
				return HttpStatus.OK;
			} else {
				System.out.println("true");
				location.setDelete(false);
				locationRepository.save(location);
				return HttpStatus.OK;
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	}

}
