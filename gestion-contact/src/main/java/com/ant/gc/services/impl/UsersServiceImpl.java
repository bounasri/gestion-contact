package com.ant.gc.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ant.gc.entites.Users;
import com.ant.gc.model.MessageResponse;
import com.ant.gc.model.PasswordDTO;
import com.ant.gc.repositories.ContactRepository;
import com.ant.gc.repositories.UsersRepository;
import com.ant.gc.services.UsersService;

@Service
public class UsersServiceImpl implements UsersService {
	@Autowired
	private UsersRepository usersRepository;
	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	@Override
	public MessageResponse save(Users user) {

		boolean exist = contactRepository.existsByEmail(user.getEmail());

		if (exist) {
			return new MessageResponse(false, "Email existant..");
		}

		exist = usersRepository.existsByUsername(user.getUsername());

		if (exist) {
			return new MessageResponse(false, "Nom d'utilisateur existant..");
		}

		String cryptedPwd = passwordEncoder.encode(user.getPassword());
		user.setPassword(cryptedPwd);

		usersRepository.save(user);

		return new MessageResponse(true, "Ajout effectué avec succès");
	}

	@Transactional
	@Override
	public MessageResponse update(Users user) {

		boolean exist = contactRepository.existsByEmailAndId(user.getEmail(), user.getId());

		if (!exist) {

			exist = contactRepository.existsByEmail(user.getEmail());

			if (exist) {
				return new MessageResponse(false, "Email existant!!!!!");
			}

		}

		exist = usersRepository.existsByUsernameAndId(user.getUsername(), user.getId());

		if (!exist) {

			exist = usersRepository.existsByUsername(user.getUsername());

			if (exist) {
				return new MessageResponse(false, "Nom d'utilisateur existant!!!!!");
			}

		}

		usersRepository.save(user);

		return new MessageResponse(true, "Modification effectué avec succès");
	}

	@Transactional
	@Override
	public MessageResponse delete(Integer id) {

		boolean exist = usersRepository.existsById(id);

		if (!exist) {
			return new MessageResponse(false, "Utilisateur introuvable !!!");
		}

		usersRepository.deleteById(id);

		return new MessageResponse(true, "Suppression effectué avec succès");
	}

	@Transactional(readOnly = true)
	@Override
	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return usersRepository.findAll();
	}

	@Override
	public MessageResponse changePassword(PasswordDTO pwdDTO) {

		Users user = usersRepository.findById(pwdDTO.getId()).orElse(null);

		if (user == null) {
			return new MessageResponse(false, "Utilisteur introuvable!!");
		}

		boolean valid = passwordEncoder.matches(pwdDTO.getOldPassword(), user.getPassword());

		if (!valid) {
			return new MessageResponse(false, "Mot de passe actuel incorrect!!");
		}

		String crytpedPwd = passwordEncoder.encode(pwdDTO.getNewPassword());

		user.setPassword(crytpedPwd);

		usersRepository.save(user);

		return new MessageResponse(true, "Mot de passe modifié avec succccccccccccccccccccccèssss");
	}

	@Override
	public Users findById(Integer id) {
		// TODO Auto-generated method stub
		return usersRepository.findById(id).orElse(null);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		return usersRepository.findOneByUsername(username);
	}

}
