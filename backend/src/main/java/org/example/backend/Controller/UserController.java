package org.example.backend.Controller;

import org.example.backend.DTO.UserDTO;
import org.example.backend.Entity.User;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody UserDTO userData){
        return ResponseEntity.ok(userService.registerUser(userData));
    }
}
