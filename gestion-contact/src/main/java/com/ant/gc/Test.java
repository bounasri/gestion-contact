package com.ant.gc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ant.gc.entites.Users;
import com.ant.gc.repositories.UsersRepository;
import com.ant.gc.services.UsersService;

@Component
public class Test implements CommandLineRunner {
	@Autowired
	private UsersService usersService;
	
	@Autowired
	private UsersRepository usersRepository;
	@Override
	public void run(String... args) throws Exception {
	
//		Users user = new Users();
//		user.setEmail("user@gmail.com");
//		user.setNom("Ali");
//		user.setPrenom("Ben ali");;
//		user.setUsername("user");
//		user.setPassword("user");
//		user.setRole("User");
//		
//		usersService.save(user);
	}

}
