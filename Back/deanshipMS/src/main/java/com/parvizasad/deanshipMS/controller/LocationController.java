package com.parvizasad.deanshipMS.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Location;
import com.parvizasad.deanshipMS.service.LocationService;

@CrossOrigin(origins = { "*" }, allowCredentials = "false")
@RestController
@RequestMapping("/locations")
public class LocationController {
	private LocationService locationService;

	public LocationController(LocationService locationService) {
		this.locationService = locationService;
	}

	@GetMapping
	public List<Location> getAllLocation() {
		return locationService.getAllLocation();
	}

	@PostMapping
	public ResponseEntity<Object> createLocation(@RequestBody Location newLocation) {
		return locationService.createLocation(newLocation);
	}

	@GetMapping("/{locationId}")
	public ResponseEntity<Object> getById(@PathVariable Long locationId) {
		return locationService.getById(locationId);
	}

	@PutMapping("/{locationId}")
	public ResponseEntity<Object> updateLocation(@PathVariable Long locationId, @RequestBody Location newLocation) {
		return locationService.updateLocation(locationId, newLocation);
	}

	@DeleteMapping("/{locationId}")
	public void deleteLocation(@PathVariable Long locationId) {
		locationService.deleteById(locationId);
	}

}
