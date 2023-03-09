package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Person;
import com.parvizasad.deanshipMS.repository.PersonRepository;

@Service
public class PersonService {

	private PersonRepository personRepository;

	public PersonService(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}

	public List<Person> getAllPersons() {
		List<Person> existPerson = new ArrayList<>();
		for (Person person : personRepository.findAll()) {
			if (person.isDelete == false) {
				existPerson.add(person);
			}
		}
		return existPerson;
	}

	@Transactional
	public ResponseEntity<Object> createPerson(Person newPerson) {
		if (personRepository.existsCurrentPersonByPasportId(newPerson.getPasportId())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu şəxs artıq yaradılıb!"); // or anything you want
		} else {
			personRepository.save(newPerson);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public ResponseEntity<Object> getById(Long personId) {
		Person person = personRepository.findById(personId).orElse(null);
		if (person != null && person.isDelete == false) {
			return new ResponseEntity<Object>(person, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("İxtisas tapılmadı!");
		}
	}

	@Transactional
	public ResponseEntity<Object> updatePerson(Long personId, Person newPerson) {

		Person person = personRepository.findById(personId).orElse(null);
		Person existPerson = personRepository.findByPasportId(newPerson.pasportId);
		Person existPersonEmail = personRepository.findByEmail(newPerson.email);
		if (person != null && person.isDelete == false) {
			if (existPerson == null && existPersonEmail == null) {
				person.fullName = newPerson.fullName;
				person.age = newPerson.age;
				person.email = newPerson.email;
				person.location = newPerson.location;
				person.pasportId = newPerson.pasportId;
				person.phno = newPerson.phno;
				personRepository.save(person);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				if (existPerson.id == personId && existPersonEmail.id == personId) {
					person.fullName = newPerson.fullName;
					person.age = newPerson.age;
					person.email = newPerson.email;
					person.location = newPerson.location;
					person.pasportId = newPerson.pasportId;
					person.phno = newPerson.phno;
					personRepository.save(person);
					return ResponseEntity.ok("Uğurlu əməliyyat!");
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN)
							.body("Bu email və ya Fin kod başqa şəxsə aiddir!");
				}
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Şəxs tapılmadı!");
		}

	}

	public ResponseEntity<Object> deleteById(Long personId) {
		Person person = personRepository.findById(personId).orElse(null);
		if (person != null) {
			person.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu şəxs artıq yaradılıb!");
		}
	}

}
