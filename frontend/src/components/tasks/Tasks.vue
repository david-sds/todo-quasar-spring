<template>
  <div>
    <q-expansion-item v-if="tasksToDo.length" :label="$t('TO_DO')" default-opened>
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksToDo"
          :key="`${task.group}-${task.name}`"
          :_done="task.done"
          :_title="task.name"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorited="task.favorite"
          @update-done="updateDone(index, $event)"
          @open-task-details-dialog="openTaskDetailsDialog(task.id)"
        />
      </q-list>
    </q-expansion-item>
    <q-expansion-item v-if="tasksDone.length" :label="doneLabel">
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksDone"
          :key="`${task.group}-${task.name}`"
          :_done="task.done"
          :_title="task.name"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorited="task.favorite"
          @update-done="updateDone(index, $event)"
          @open-task-details-dialog="openTaskDetailsDialog(task.id)"
        />
      </q-list>
    </q-expansion-item>
    <q-btn
      round
      icon="mdi-plus"
      color="blue"
      class="absolute-bottom-right q-pa-md q-ma-md"
      @click="openCreateTaskDialog"
    />
    <TaskDetailsDialog
      ref="taskDetailsDialog"
      :_title="selectedTask.name"
      :_done="selectedTask.done"
      :_favorited="selectedTask.favorite"
    />
    <CreateTaskDialog
      ref="createTaskDialog"
    />
  </div>
</template>

<script>
import Task from "src/components/tasks/Task.vue"
import TaskDetailsDialog from "src/components/tasks/TaskDetailsDialog.vue"
import CreateTaskDialog from "src/components/tasks/CreateTaskDialog.vue"

export default {
  name: 'Tasks',
  components: {
    Task: Task,
    TaskDetailsDialog: TaskDetailsDialog,
    CreateTaskDialog: CreateTaskDialog,
  },
  data: function () {
    return {
      tasksToDo: [],
      tasksDone: [],
      selectedTask: {},
    };
  },
  created: async function () {
    const response = await this.$api.get('task');

    const tasks = response?.data;

    if (tasks) {
      tasks.forEach(task => {
        if (task.done) {
          this.tasksDone.push(task);
        } else {
          this.tasksToDo.push(task);
        }
      })
    }
  },
  computed: {
    doneLabel: function () {
      return `${this.$t('DONE')} (${+this.tasksDone.length})`
    }
  },
  methods: {
    updateDone: function (index, isDone) {
      if (isDone) {
        const task = this.tasksToDo.splice(index, 1)[0];
        task.done = isDone;
        this.tasksDone.splice(this.tasksDone.length, 1, task);
      } else {
        const task = this.tasksDone.splice(index, 1)[0];
        task.done = isDone;
        this.tasksToDo.splice(this.tasksToDo.length, 1, task);
      }
    },
    openTaskDetailsDialog: function (taskId) {
      this.selectedTask = this.tasksToDo.find(task => task.id === taskId) ?? this.tasksDone.find(task => task.id === taskId);
      this.$refs.taskDetailsDialog.open();
    },
    openCreateTaskDialog: function () {
      this.$refs.createTaskDialog.open();
    },
  },
}
</script>