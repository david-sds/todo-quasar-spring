package com.study.todo.tasks;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task getTask(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Task saveTask(Task task) {
        task.setDone(task.getDone() != null && task.getDone());
        task.setRemind_me(task.getRemind_me() != null && task.getRemind_me());
        task.setMy_day(task.getMy_day() != null && task.getMy_day());
        task.setFavorite(task.getFavorite() != null && task.getFavorite());
        return taskRepository.save(task);
    }

}
