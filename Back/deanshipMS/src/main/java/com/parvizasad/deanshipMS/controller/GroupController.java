package com.parvizasad.deanshipMS.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parvizasad.deanshipMS.entities.Group;
import com.parvizasad.deanshipMS.service.GroupService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/groups")
public class GroupController {
	private GroupService groupService;

	public GroupController(GroupService groupService) {
		this.groupService = groupService;
	}

	@GetMapping
	public List<Group> getAllGroup() {
		return groupService.getAllGroup();
	}
	
	@GetMapping("/passivGroup")
	public List<Group> getAllPassivGroup() {
		return groupService.getAllPassivGroup();
	}
	
	@GetMapping("/activeGroup")
	public List<Group> getAllActiveGroup() {
		return groupService.getAllActiveGroup();
	}
	
	@PostMapping
	public Object createGroup(@RequestBody Group newGroup) {
		return groupService.createGroup(newGroup);
	}
	
	@GetMapping("/{groupId}")
	public Object getById(@PathVariable Long groupId) {
		return groupService.getById(groupId);
	}

	@PutMapping("/{groupId}")
	public Object updateGroup(@PathVariable Long groupId, @RequestBody Group newGroup) {
		return groupService.updateGroup(groupId, newGroup);
	}

	@DeleteMapping("/{groupId}")
	public Object deleteGroup(@PathVariable Long groupId) {
	return groupService.deleteById(groupId);
	}

	
	
	
}
