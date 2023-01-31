<template>
  <div>
    <q-expansion-item label="To Do" default-opened>
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksToDo"
          :key="`${task.group}-${task.title}`"
          :_done="task.done"
          :_title="task.title"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorited="task.favorited"
          @update-done="updateDone(index, $event)"
        />
      </q-list>
    </q-expansion-item>
    <q-expansion-item :label="doneLabel">
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksDone"
          :key="`${task.group}-${task.title}`"
          :_done="task.done"
          :_title="task.title"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorited="task.favorited"
          @update-done="updateDone(index, $event)"
        />
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import Task from "src/components/tasks/Task.vue"

export default {
  name: 'Tasks',
  components: {
    Task: Task,
  },
  data: function () {
    return {
      tasksToDo: [
        {
          title: 'Code a ToDo App 1',
          group: 'TECH',
          done: false,
          day: 'Today',
          reccurency: true,
          favorited: false,
        },
                {
          title: 'Code a ToDo App 2',
          group: 'TECH',
          done: false,
          day: 'Today',
          reccurency: false,
          favorited: false,
        },
                {
          title: 'Code a ToDo App 3',
          group: 'TECH',
          done: false,
          day: 'Today',
          reccurency: false,
          favorited: false,
        },
      ],
      tasksDone: [],
    };
  },
  computed: {
    doneLabel: function () {
      return `Done (${+this.tasksDone.length})`
    }
  },
  methods: {
    updateDone: function (index, isDone) {
      console.log(index, isDone);
      if (isDone) {
        const task = this.tasksToDo.splice(index, 1)[0];
        task.done = isDone;
        this.tasksDone.splice(this.tasksDone.length, 1, task);
      } else {
        const task = this.tasksDone.splice(index, 1)[0];
        task.done = isDone;
        this.tasksToDo.splice(this.tasksToDo.length, 1, task);
      }
      console.log('todo', this.tasksToDo);
      console.log('done', this.tasksDone);
    },
  },
}
</script>