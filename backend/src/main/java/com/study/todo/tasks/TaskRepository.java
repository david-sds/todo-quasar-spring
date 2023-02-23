package com.study.todo.tasks;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {

    Task findById(Long id);

    List<Task> findByUserId(Long user_id);
}