<template>
  <div>
    <Tasks />
  </div>
</template>

<script>
import Tasks from "src/components/tasks/Tasks.vue";

export default {
  name: 'TasksPage',
  components: {
    Tasks: Tasks,
  },
}
</script>

<style>
</style>