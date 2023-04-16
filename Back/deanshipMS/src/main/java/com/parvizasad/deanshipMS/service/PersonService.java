package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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
		List<Person> person = personRepository.findAll();
		return person;
	}

	public List<Person> getAllActivePersons() {
		List<Person> activePersonList =new ArrayList<Person>();
		for (Person person : personRepository.findAll()) {
			if (!person.isDelete) {
				activePersonList.add(person);
			}
		}
		return activePersonList;
	}
	
	public List<Person> getAllPassivPersons() {
		List<Person> passivPersonList =new ArrayList<Person>();
		for (Person person : personRepository.findAll()) {
			if (person.isDelete) {
				passivPersonList.add(person);
			}
		}
		return passivPersonList;
	}
	
	public Object createPerson(Person newPerson) {
		Person existingPerson = personRepository.findByPasportId(newPerson.getPasportId()).orElse(null);
		
		if (newPerson.pasportId.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingPerson != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		personRepository.save(newPerson);
		return HttpStatus.OK;
	}
	
	public Object getById(Long personId) {
		Person person = personRepository.findById(personId).orElse(null);
		if (person == null) {
			return HttpStatus.NOT_FOUND;
		} 
		return person;
	}


	public Object updatePerson(Long personId, Person newPerson)  {
		Person person = personRepository.findById(personId).orElse(null);
		Person existPerson = personRepository.findByPasportId(newPerson.pasportId).orElse(null);
		
		if (person == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newPerson.pasportId.length() == 0 || (existPerson != null && (existPerson.id != personId))) {
			return HttpStatus.BAD_REQUEST;
		}

		person.fullName = newPerson.fullName;
		person.birthDate = newPerson.birthDate;
		person.email = newPerson.email;
		person.setLocation(newPerson.getLocation()); 
		person.setGender(newPerson.getGender());
		person.setPosition(newPerson.getPosition());
		person.pasportId = newPerson.pasportId;
		person.phno = newPerson.phno;
		personRepository.save(person);
		return HttpStatus.OK;
	}
	
	public Object deleteById(Long personId) {
		Person person = personRepository.findById(personId).orElse(null);
		
		if (person == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		person.setDelete(!person.isDelete());
		personRepository.save(person);
		return HttpStatus.OK;
	}
	

}
