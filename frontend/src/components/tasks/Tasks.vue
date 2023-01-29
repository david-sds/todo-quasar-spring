<template>
  <div style="width: 100vw; height: 100vh; background-color: cyan">
    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="`${task.group}-${task.title}`">
        <span>{{ task.title }}</span>
        <span>{{ task.group }}</span>
        <span>{{ task.day }}</span>
        <span>{{ task.reccurency }}</span>
        <span>{{ task.favorited }}</span>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data: function () {
    return {
      tasks: [
        {
          title: 'Code a ToDo App 1',
          group: 'TECH',
          done: false,
          day: 'Today',
          reccurency: false,
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
      ]
    };
  }
}
</script>

<style>
</style>