package com.ant.gc.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.ant.gc.entites.Users;
import com.ant.gc.model.MessageResponse;
import com.ant.gc.model.PasswordDTO;

public interface UsersService extends UserDetailsService {

	public MessageResponse save(Users user);
	public MessageResponse update(Users user);
	public MessageResponse delete(Integer id);
	public List<Users> findAll();
	public MessageResponse changePassword(PasswordDTO pwdDTO);
	public Users findById(Integer id);
}
