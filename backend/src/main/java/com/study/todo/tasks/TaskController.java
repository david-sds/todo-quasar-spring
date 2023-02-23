package com.study.todo.tasks;

import com.study.todo.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/task")
@ResponseBody
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @RequestMapping(value = "data", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTask(@RequestParam(value = "id") String id) {
        Long Id = Long.parseLong(id);
        return ResponseEntity.ok(taskService.getTask(Id));
    }

    @GetMapping
    public ResponseEntity<?> getTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User)(authentication.getPrincipal());
        Long userId = user.getId();

        List<Task> userTasks = taskService.getUserTasks(userId);

        return ResponseEntity.ok(userId);
    }

    @PostMapping
    public ResponseEntity<?> saveTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.saveTask(task));
    }

}
