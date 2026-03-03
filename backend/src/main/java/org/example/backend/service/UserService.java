package org.example.backend.service;

import org.example.backend.DTO.UserDTO;
import org.example.backend.Entity.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserService(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User registerUser(UserDTO userData){
        User newUser = User.builder()
                .username(userData.username)
                .email(userData.email)
                .password_hash(passwordEncoder.encode(userData.password))
                .role("user")
                .created_at(LocalDateTime.now())
                .build();

        userRepository.save(newUser);

        return newUser;
    }
}
