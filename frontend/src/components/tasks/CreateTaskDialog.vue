<template>
  <q-dialog
    v-model="isOpen"
    transition-show="slide-up"
    transition-hide="slide-down"
    position="bottom"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none" >
        <q-checkbox
          v-model="done"
          checked-icon="mdi-check-circle-outline"
          unchecked-icon="mdi-circle-outline"
          size="lg"
          disable
        />
        <q-input
          v-model="name"
          class="col-grow"
          :label="$t('ADD_A_TASK')"
          borderless
          @keypress.enter="createTask"
        />
        <q-btn
          icon="mdi-arrow-up"
          class="q-pa-sm"
          color="blue"
          text-color="white"
          :disable="!isTaskName"
          @click="createTask"
        />
      </q-card-section>
      <q-card-section class="row no-wrap q-pt-none" style="overflow-x: auto;">
        <CSelect
          v-model="dueDate"
          :_options="dueDateOptions"
          :_buttonLabel="$t('SET_DUE_DATE')"
          _buttonIcon="today"
          @update:modelValue="executeCustomOptions"
        />
        <CSelect
          v-model="remindMe"
          :_options="remindMeOptions"
          :_buttonLabel="$t('REMIND_ME')"
          _buttonIcon="mdi-bell-outline"
          @update:modelValue="executeCustomOptions"
        />
        <CSelect
          v-model="repeat"
          :_options="repeatOptions"
          :_buttonLabel="$t('REPEAT')"
          _buttonIcon="mdi-autorenew"
          @update:modelValue="executeCustomOptions"
        />
      </q-card-section>
    </q-card>
    <CConfirmDialog
      ref="dateDialog"
      :_confirm="$t('OK')"
      :_cancel="$t('CANCEL')"
    >
      <CDateTime
        v-model="dateTime"
        _date
        :_time="pickTime"
      />
    </CConfirmDialog>
  </q-dialog>
</template>

<script>
import CSelect from 'src/components/core/CSelect.vue';
import CDateTime from 'src/components/core/CDateTime.vue';
import CConfirmDialog from 'src/components/core/CConfirmDialog.vue';

import { saveTask } from 'src/requests/tasks'

export default {
  name: "CreateTaskDialog",
  components: {
    CSelect: CSelect,
    CDateTime: CDateTime,
    CConfirmDialog: CConfirmDialog,
  },
  data: function () {
    return {
      isOpen: false,
      done: false,
      name: null,
      dueDate: null,
      remindMe: null,
      repeat: null,
      dateTime: null,
      dueDateOptions: [
        {
          id: "today",
          icon: 'mdi-calendar-today',
          name: this.$t("TODAY"),
        },
        {
          id: "tomorrow",
          icon: 'mdi-calendar-arrow-right',
          name: this.$t("TOMORROW"),
        },
        {
          id: "next-week",
          icon: 'mdi-calendar-week',
          name: this.$t("NEXT_WEEK"),
        },
        {
          id: "pick-a-date",
          icon: 'mdi-calendar-cursor',
          name: this.$t("PICK_A_DATE"),
          complex: true,
        },
      ],
      remindMeOptions: [
        {
          id: "later-today",
          icon: 'mdi-update',
          name: this.$t("LATER_TODAY"),
        },
        {
          id: "tomorrow",
          icon: 'mdi-clock-outline',
          name: this.$t("TOMORROW"),
        },
        {
          id: "next-week",
          icon: 'mdi-clock-start',
          name: this.$t("NEXT_WEEK"),
        },
        {
          id: "pick-a-date-and-time",
          icon: 'mdi-calendar-clock',
          name: this.$t("PICK_A_DATE_AND_TIME"),
          complex: true,
        },
      ],
      repeatOptions: [
        {
          id: "daily",
          icon: 'mdi-repeat',
          name: this.$t("DAILY"),
        },
        {
          id: "weekdays",
          icon: 'mdi-repeat',
          name: this.$t("WEEKDAYS"),
        },
        {
          id: "weekly",
          icon: 'mdi-repeat-once',
          name: this.$t("WEEKLY"),
        },
        {
          id: "monthly",
          icon: 'mdi-calendar-refresh',
          name: this.$t("MONTHLY"),
        },
        {
          id: "yearly",
          icon: 'mdi-star-shooting-outline',
          name: this.$t("YEARLY"),
        },
        {
          id: "custom",
          icon: 'mdi-pencil-circle-outline',
          name: this.$t("CUSTOM"),
          complex: true,
        },
      ],
    };
  },
  computed: {
    isTaskName: function () {
      return this.name?.length > 0;
    },
  },
  methods: {
    createTask: async function () {
      if (!this.isTaskName) {
        return;
      }

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
    executeCustomOptions: function (option) {
      switch (option?.id) {
        case 'pick-a-date':
          this.pickTime = false;
          this.$refs.dateDialog.open();
          break;
        case 'pick-a-date-and-time':
          this.pickTime = true;
          this.$refs.dateDialog.open();
          break;
        case 'custom':
          console.log('custom');
          break;
        default:
          break;
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
