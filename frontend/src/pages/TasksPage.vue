<template>
  <Tasks />
</template>

<script>
export default {
  name: 'TasksPage',
  components: {
    Tasks: () => import("src/components/tasks/Tasks.vue"),
  },
}
</script>

<style>
</style>