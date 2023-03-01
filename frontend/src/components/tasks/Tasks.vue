<template>
  <div>
    <q-expansion-item v-if="tasksToDo.length" :label="$t('TO_DO')" default-opened>
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksToDo"
          :key="`${index}${task.id}`"
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
    <q-expansion-item v-if="tasksDone.length" :label="`${$t('DONE')} (${tasksDone.length})`">
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksDone"
          :key="`${index}${task.id}`"
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
      :_createdAt="selectedTask.createdAt"
    />
    <CreateTaskDialog
      ref="createTaskDialog"
      @created="load"
    />
  </div>
</template>

<script>
import Task from "src/components/tasks/Task.vue"
import TaskDetailsDialog from "src/components/tasks/TaskDetailsDialog.vue"
import CreateTaskDialog from "src/components/tasks/CreateTaskDialog.vue"
import { createTask } from 'src/requests/tasks'

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
    await this.load();
  },
  methods: {
    load: async function () {
      const response = await this.$api.get('task');

      const tasks = response?.data;

      this.tasksDone = []
      this.tasksToDo = []

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
    updateDone: async function (index, isDone) {
      if (isDone) {
        const task = this.tasksToDo.splice(index, 1)[0];
        task.done = isDone;
        this.tasksDone.splice(this.tasksDone.length, 1, task);
        await createTask(task);
      } else {
        const task = this.tasksDone.splice(index, 1)[0];
        task.done = isDone;
        this.tasksToDo.splice(this.tasksToDo.length, 1, task);
        await createTask(task);
      }
    },
    openTaskDetailsDialog: function (taskId) {
      this.selectedTask = this.tasksToDo.find(task => task.id === taskId) ?? this.tasksDone.find(task => task.id === taskId);
      this.$refs.taskDetailsDialog.open();
    },
    openCreateTaskDialog: function () {
      this.$refs.createTaskDialog.open();
    },
  }
}

</script>