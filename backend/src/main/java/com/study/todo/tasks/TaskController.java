package com.study.todo.tasks;

import com.study.todo.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

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
        List<Task> userTasks = taskService.getUserTasks(User.getLoggedUserId());

        return ResponseEntity.ok(userTasks);
    }

    @PostMapping
    public ResponseEntity<?> saveTask(@RequestBody Task task) {
        task.setUserId(User.getLoggedUserId());

        return ResponseEntity.ok(taskService.saveTask(task));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id) {
        List<Task> userTasks = taskService.getUserTasks(User.getLoggedUserId());

        boolean isTaskFromUser = false;
        for (Task task : userTasks) {
            if (Objects.equals(task.getId(), id)) {
                isTaskFromUser = true;
                break;
            }
        }

        if (!isTaskFromUser) {
            return ResponseEntity.status(403).body("Not allowed to delete tasks from other accounts");
        }

        return ResponseEntity.ok(taskService.deleteTask(id));
    }

}
