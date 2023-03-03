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

    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task saveTask(Task task) {
        task.setDone(task.getDone() != null && task.getDone());
        task.setRemindMe(task.getRemindMe() != null && task.getRemindMe());
        task.setMyDay(task.getMyDay() != null && task.getMyDay());
        task.setFavorite(task.getFavorite() != null && task.getFavorite());
        return taskRepository.save(task);
    }

    public boolean deleteTask(Long taskId) {
        taskRepository.deleteById(String.valueOf(taskId));

        return true;
    }

}
