package com.study.todo.tasks;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    private String name;
    private String icon;
    private Date dueDate;
    private Boolean done;
    private Boolean remindMe;
    private Date remindMeDate;
    private Boolean favorite;
    private Boolean myDay;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private Date completedAt;
    private Long groupId;
    private Long stepsId;
    private Long fileId;
    private Long notesId;
    private Long userId;
}
