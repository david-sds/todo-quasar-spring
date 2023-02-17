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