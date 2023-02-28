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
          :label="$t('ADD_A_TASK')"
          @keypress.enter="createTask"
        />
        <q-btn
          icon="mdi-arrow-up"
          @click="createTask"
        />
      </q-card-section>
      <q-card-section class="row no-wrap" style="overflow-x: auto;">
        <q-btn
          :label="$t('SET_DUE_DATE')"
          icon="today"
          no-caps
          no-wrap
          flat
        />
        <q-btn
          :label="$t('REMIND_ME')"
          icon="mdi-bell-outline"
          no-caps
          no-wrap
          flat
        />
        <q-btn
          :label="$t('REPEAT')"
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
import { createTask } from 'src/requests/tasks'

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
        const task = {
          name: this.name,
          done: this.done,
        };

        await createTask(task)

        this.$emit('created');

        this.$notify.success(this.$t('NOTIFY.TASK.CREATED'))

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