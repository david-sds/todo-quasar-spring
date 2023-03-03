<template>
  <div>
    <q-expansion-item v-if="tasksToDo.length" :label="$t('TO_DO')" default-opened>
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksToDo"
          :key="`${index}${task.id}`"
          :_id="task.id"
          :_done="false"
          :_title="task.name"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorite="task.favorite"
          @updated="updateTask($event, task)"
          @open-task-details-dialog="openTaskDetailsDialog(task)"
        />
      </q-list>
    </q-expansion-item>
    <q-expansion-item v-if="tasksDone.length" :label="`${$t('DONE')} (${tasksDone.length})`">
      <q-list bordered separator>
        <Task
          v-for="(task, index) in tasksDone"
          :key="`${index}${task.id}`"
          :_id="task.id"
          :_done="true"
          :_title="task.name"
          :_group="task.group"
          :_day="task.day"
          :_reccurency="task.reccurency"
          :_favorite="task.favorite"
          @updated="updateTask($event, task)"
          @open-task-details-dialog="openTaskDetailsDialog(task)"
        />
      </q-list>
    </q-expansion-item>
    <q-btn
      round
      icon="mdi-plus"
      color="blue"
      class="fixed-bottom-right q-pa-md q-ma-md"
      @click="openCreateTaskDialog"
    />
    <TaskDetailsDialog
      v-if="selectedTask.id"
      ref="taskDetailsDialog"
      :_id="selectedTask.id"
      :_title="selectedTask.name"
      :_done="selectedTask.done"
      :_favorite="selectedTask.favorite"
      :_createdAt="selectedTask.createdAt"
      @updated="updateTask"
      @reload="load"
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

import { fetchTasks, saveTask } from 'src/requests/tasks'

export default {
  name: 'Tasks',
  components: {
    Task: Task,
    TaskDetailsDialog: TaskDetailsDialog,
    CreateTaskDialog: CreateTaskDialog,
  },
  data: function () {
    return {
      tasks: [],
      selectedTask: {},
    };
  },
  created: async function () {
    await this.load();
  },
  computed: {
    tasksDone: function () {
      return this.tasks.filter(task => task.done)
    },
    tasksToDo: function () {
      return this.tasks.filter(task => !task.done)
    },
  },
  methods: {
    load: async function () {
      const unorderedTasks = await fetchTasks();

      this.tasks = unorderedTasks.sort((a, b) => b.favorite - a.favorite);;
    },
    updateTask: async function (newTaskValues, task) {
      if (!task) {
        task = this.tasks.find(task => task.id === newTaskValues.id);
      }


      if (task.id === newTaskValues.id) {
        const updatedTask = { ...task, ...newTaskValues };

        await saveTask(updatedTask);

        this.load();
      } else {
        console.error('The id\'s do not coincide.')
      }
    },
    openTaskDetailsDialog: async function (task) {
      this.selectedTask = task;

      await this.$nextTick();

      this.$refs.taskDetailsDialog.open();
    },
    openCreateTaskDialog: function () {
      this.$refs.createTaskDialog.open();
    },
  }
}

</script>