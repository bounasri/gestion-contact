package com.ant.gc.model;

import java.io.Serializable;

import lombok.Data;
@Data
public class PasswordDTO implements Serializable{
	private Integer id;
	private String oldPassword;
	private String newPassword;
}
