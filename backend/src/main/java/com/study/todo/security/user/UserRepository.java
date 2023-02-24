package com.study.todo.security.user;

import com.study.todo.tasks.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(Long id);

    Optional<User> findByEmail(String email);

}
