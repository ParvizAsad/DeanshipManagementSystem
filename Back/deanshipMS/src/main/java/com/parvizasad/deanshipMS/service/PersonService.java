package com.parvizasad.deanshipMS.service;

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
		return personRepository.findAll();
	}

	@Transactional
	public ResponseEntity<Object> createPerson(Person newPerson) {
		if (personRepository.existsCurrentPersonByPasportId(newPerson.getPasportId())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu şəxs artıq yaradılıb!"); // or anything you want
																									// to do if record
																									// is already
																									// exists.
		} else {
			personRepository.save(newPerson);
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		}
	}

	public Person getById(Long personId) {
		return personRepository.findById(personId).orElse(null);
	}

	@Transactional
	public ResponseEntity<Object> updatePerson(Long personId, Person newPerson) {
		Person person = getById(personId);
		if (person != null) {
			if (!personRepository.existsCurrentPersonByPasportId(newPerson.getPasportId())
					&& !personRepository.existsCurrentPersonByEmail(newPerson.getEmail())) {
				person.fullName = newPerson.fullName;
				person.age = newPerson.age;
				person.email = newPerson.email;
				person.location = newPerson.location;
				person.pasportId = newPerson.pasportId;
				person.phno = newPerson.phno;
				personRepository.save(person);
				return ResponseEntity.ok("Uğurlu əməliyyat!");
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu email və ya Fin kod başqa şəxsə aiddir!");
			}
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Şəxs tapılmadı!");
		}

	}

	public ResponseEntity<Object> deleteById(Long personId) {
		Person person = getById(personId);
		if (person != null) {
			person.isDelete = true;
			return ResponseEntity.ok("Uğurlu əməliyyat!");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bu şəxs artıq yaradılıb!");
		}
	}

}
