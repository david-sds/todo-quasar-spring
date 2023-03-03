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
        <COptions
          :_options="dueDateOptions"
          :_buttonLabel="$t('SET_DUE_DATE')"
          _buttonIcon="today"
        />
        <COptions
          :_options="remindMeOptions"
          :_buttonLabel="$t('REMIND_ME')"
          _buttonIcon="mdi-bell-outline"
        />
        <COptions
          :_options="repeatOptions"
          :_buttonLabel="$t('REPEAT')"
          _buttonIcon="mdi-autorenew"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import COptions from 'src/components/core/COptions.vue';

import { saveTask } from 'src/requests/tasks'

export default {
  name: "CreateTaskDialog",
  components: {
    COptions: COptions,
  },
  data: function () {
    return {
      isOpen: false,
      done: false,
      name: null,
      dueDateOptions: [
        {
          id: "today",
          icon: '',
          name: this.$t("TODAY"),
        },
        {
          id: "tomorrow",
          icon: '',
          name: this.$t("TOMORROW"),
        },
        {
          id: "next-week",
          icon: '',
          name: this.$t("NEXT_WEEK"),
        },
        {
          id: "pick-a-date",
          icon: '',
          name: this.$t("PICK_A_DATE"),
        },
      ],
      remindMeOptions: [
        {
          id: "later-today",
          icon: '',
          name: this.$t("LATER_TODAY"),
        },
        {
          id: "tomorrow",
          icon: '',
          name: this.$t("TOMORROW"),
        },
        {
          id: "next-week",
          icon: '',
          name: this.$t("NEXT_WEEK"),
        },
        {
          id: "pick-a-date-and-time",
          icon: '',
          name: this.$t("PICK_A_DATE_AND_TIME"),
        },
      ],
      repeatOptions: [
        {
          id: "daily",
          icon: '',
          name: this.$t("DAILY"),
        },
        {
          id: "weekdays",
          icon: '',
          name: this.$t("WEEKDAYS"),
        },
        {
          id: "weekly",
          icon: '',
          name: this.$t("WEEKLY"),
        },
        {
          id: "monthly",
          icon: '',
          name: this.$t("MONTHLY"),
        },
        {
          id: "yearly",
          icon: '',
          name: this.$t("YEARLY"),
        },
        {
          id: "custom",
          icon: '',
          name: this.$t("CUSTOM"),
        },
      ],
    };
  },
  methods: {
    createTask: async function () {
      try {
        const task = {
          name: this.name,
          done: this.done,
        };

        await saveTask(task)

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
