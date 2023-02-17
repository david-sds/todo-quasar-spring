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
    @Column(name = "id", unique=true, nullable = false)
    private Long id;

    private String name;
    private String icon;
    private Date due_date;
    private Boolean done;
    private Date done_data;
    private Boolean remind_me;
    private Date remind_me_date;
    private Boolean favorite;
    private Boolean my_day;
	private Long group_id;
    private Long steps_id;
    private Long file_id;
    private Long notes_id;
}
