<template>
  <q-dialog
    v-model="isOpen"
    transition-show="slide-up"
    transition-hide="slide-down"
    position="bottom"
  >
    <q-card>
      <q-card-section class="row items-center" >
        <q-checkbox
          v-model="done"
          checked-icon="mdi-check-circle-outline"
          unchecked-icon="mdi-circle-outline"
        />
        <q-input
          v-model="name"
          class="col-grow"
          label="Add a task"
        />
        <q-btn
          icon="mdi-arrow-up"
          @click="createTask"
        />
      </q-card-section>
      <q-card-section class="row no-wrap" style="overflow-x: auto;">
        <q-btn
          label="Set due date"
          icon="today"
          no-caps
          no-wrap
          flat
        />
        <q-btn
          label="Remind me" 
          icon="mdi-bell-outline"
          no-caps
          no-wrap
          flat
        />
        <q-btn
          label="Repeat" 
          icon="mdi-autorenew"
          no-caps
          no-wrap
          flat
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CreateTaskDialog",
  data: function () {
    return {
      isOpen: false,
      done: false,
      name: null,
    };
  },
  methods: {
    createTask: async function () {
      try {
        const params = {
          name: this.name,
          done: this.done,
        };

        await this.$api.post('task', params)

        this.close();
      } catch (e) {
        throw new Error(e);
      }
    },
    open: function () {
      this.isOpen = true;
    },
    close: function () {
      this.isOpen = false;
    },
  },
}
</script>

<style>
</style>