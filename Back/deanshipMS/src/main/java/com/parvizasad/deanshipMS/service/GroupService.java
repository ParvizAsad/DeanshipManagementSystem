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
		if (newGroup.name.length() != 0) {
			if (existingGroup == null) {
				groupRepository.save(newGroup);
				return HttpStatus.OK;
			} else {
				return HttpStatus.BAD_REQUEST;
			}
		} else
			return HttpStatus.NOT_FOUND;
	}

	public Object getById(Long groupId) {
		Group group = groupRepository.findById(groupId).orElse(null);
		if (group != null) {
			return group;
		} else {
			return HttpStatus.NOT_FOUND;
		}
	}

	public Object updateGroup(Long groupId, Group newGroup) {
		Group group = groupRepository.findById(groupId).orElse(null);
		Group existGroup = groupRepository.findByName(newGroup.name).orElse(null);
		if (group != null) {
			if (existGroup == null) {
				if (newGroup.name.length() != 0) {
					group.name = newGroup.name;
					groupRepository.save(group);
					return HttpStatus.OK;
				} else {
					return HttpStatus.BAD_REQUEST;
				}
			} else {
				if (existGroup.id != groupId) {
					return HttpStatus.BAD_REQUEST;// mövcuddur
				} else {
					group.name = newGroup.name;
					groupRepository.save(group);
					return HttpStatus.OK;
				}
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapılmadı
		}
	}

	public Object deleteById(Long groupId) {
		Group group = groupRepository.findById(groupId).orElse(null);
		if (group != null) {
			if (!group.isDelete()) {
				group.setDelete(true);
				groupRepository.save(group);
				return HttpStatus.OK;
			} else {
				group.setDelete(false);
				groupRepository.save(group);
				return HttpStatus.OK;
			}
		} else {
			return HttpStatus.NOT_FOUND;// tapilmadi
		}
	}

}
