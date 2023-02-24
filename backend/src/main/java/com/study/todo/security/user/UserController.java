package com.study.todo.security.user;

import com.study.todo.tasks.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/user")
@ResponseBody
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getLoggedUserData() {
        User loggedUserData = userService.getUser(User.getLoggedUserId());

        UserResponse userResponse = UserResponse.builder()
                .id(loggedUserData.getId())
                .firstname(loggedUserData.getFirstname())
                .lastname(loggedUserData.getLastname())
                .email(loggedUserData.getEmail())
                .role(loggedUserData.getRole())
                .build();

        return ResponseEntity.ok(userResponse);
    }



}
