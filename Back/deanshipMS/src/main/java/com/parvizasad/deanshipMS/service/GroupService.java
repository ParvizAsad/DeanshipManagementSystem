package com.parvizasad.deanshipMS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.parvizasad.deanshipMS.entities.Group;
import com.parvizasad.deanshipMS.repository.GroupRepository;

@Service
public class GroupService {

	private GroupRepository groupRepository;

	public GroupService(GroupRepository groupRepository) {
		this.groupRepository = groupRepository;
	}

	public List<Group> getAllGroup() {
		List<Group> groupList = groupRepository.findAll();
		return groupList;
	}

	public List<Group> getAllActiveGroup() {
		List<Group> activeGroupList =new ArrayList<Group>();
		for (Group group : groupRepository.findAll()) {
			if (!group.isDelete) {
				activeGroupList.add(group);
			}
		}
		return activeGroupList;
	}
	
	public List<Group> getAllPassivGroup() {
		List<Group> passivGroupList =new ArrayList<Group>();
		for (Group group : groupRepository.findAll()) {
			if (group.isDelete) {
				passivGroupList.add(group);
			}
		}
		return passivGroupList;
	}
	
	public Object createGroup(Group newGroup) {
		Group existingGroup = groupRepository.findByName(newGroup.getName()).orElse(null);
		
		if (newGroup.name.length() == 0 ) {
			return HttpStatus.NOT_FOUND;
		}
		
		if (existingGroup != null ) {
			return HttpStatus.BAD_REQUEST;
		}
		groupRepository.save(newGroup);
		return HttpStatus.OK;
	}

	public Object getById(Long groupId) {
		Group group = groupRepository.findById(groupId).orElse(null);
		if (group != null) {
			return HttpStatus.NOT_FOUND;
		} 
			return group;
	}

	public Object updateGroup(Long groupId, Group newGroup) {
		Group group = groupRepository.findById(groupId).orElse(null);
		Group existGroup = groupRepository.findByName(newGroup.name).orElse(null);
		
		if (group == null) {
			return HttpStatus.NOT_FOUND;
		}

		if (newGroup.name.length() == 0 || (existGroup != null && (existGroup.id != groupId))) {
			return HttpStatus.BAD_REQUEST;
		}

		group.name = newGroup.name;
		groupRepository.save(group);
		return HttpStatus.OK;
		
	}

	public Object deleteById(Long groupId) {
		Group group = groupRepository.findById(groupId).orElse(null);
		
		if (group == null) {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	
		group.setDelete(!group.isDelete());
		groupRepository.save(group);
		return HttpStatus.OK;
		
	}

}
