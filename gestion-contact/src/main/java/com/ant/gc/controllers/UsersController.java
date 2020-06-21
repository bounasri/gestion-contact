package com.ant.gc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ant.gc.entites.Users;
import com.ant.gc.model.MessageResponse;
import com.ant.gc.model.PasswordDTO;
import com.ant.gc.services.UsersService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UsersController {
	@Autowired
	private UsersService usersService;
	@PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_User')")
	// @RequestMapping(value = "/list", method = RequestMethod.GET)
	@GetMapping
	public List<Users> getAll() {
		return usersService.findAll();
	}

	@PreAuthorize("hasRole('ROLE_Admin')")
	// @RequestMapping(method = RequestMethod.POST)
	@PostMapping
	public MessageResponse add(@RequestBody Users user) {
		return usersService.save(user);
	}

	@PreAuthorize("hasRole('ROLE_Admin')")
	@PutMapping
	public MessageResponse edit(@RequestBody Users user) {
		return usersService.update(user);
	}
	@PreAuthorize("hasRole('ROLE_Admin')")
	@DeleteMapping("/{id}")
	public MessageResponse delete(@PathVariable("id") Integer id) {

		return usersService.delete(id);
	}

	@PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_User')")
	@PatchMapping
	public MessageResponse changePassword(@RequestBody PasswordDTO pwdDto) {
		return usersService.changePassword(pwdDto);
	}
	@PreAuthorize("hasAnyRole('ROLE_Admin', 'ROLE_User')")
	@GetMapping("/{id}")
	public Users findById(@PathVariable("id") Integer id) {
		return usersService.findById(id);
	}
}
