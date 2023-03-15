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
      ref="dueDateDialog"
      _square
      :_confirm="$t('OK')"
      :_cancel="$t('CANCEL')"
      @confirm="confirmDueDateDialog"
      @cancel="cancelDueDateDialog"
    >
      <CDateTime
        v-model="dueDate"
        _date
      />
    </CConfirmDialog>
    <CConfirmDialog
      ref="remindMeDialog"
      _square
      :_confirm="$t('OK')"
      :_cancel="$t('CANCEL')"
      @confirm="confirmRemindMeDialog"
      @cancel="cancelRemindMeDialog"
    >
      <CDateTime
        v-model="remindMe"
        _date
        _time
      />
    </CConfirmDialog>
    <CConfirmDialog
      ref="customDialog"
      _square
      :_confirm="$t('OK')"
      :_cancel="$t('CANCEL')"
      @confirm="confirmCustomDialog"
      @cancel="cancelCustomDialog"
    >
    </CConfirmDialog>
  </q-dialog>
</template>

<script>
import CSelect from 'src/components/core/CSelect.vue';
import CDateTime from 'src/components/core/CDateTime.vue';
import CConfirmDialog from 'src/components/core/CConfirmDialog.vue';

import {
  createTasksOptionsIds,
  dueDateOptions,
  remindMeOptions,
  repeatOptions,
} from './createTaskOptions.js'

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
      dueDateOptions: dueDateOptions,
      remindMeOptions: remindMeOptions,
      repeatOptions: repeatOptions,
      isOpen: false,
      done: false,
      name: null,
      dueDate: null,
      remindMe: null,
      repeat: null,
      dateTime: null,
    };
  },
  watch: {
    dateTime: function () {
      console.log('val', this.dateTime)
    }
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
    confirmDueDateDialog: function () {
      this.$refs.dueDateDialog.close();
    },
    cancelDueDateDialog: function () {
      this.$refs.dueDateDialog.close();
    },
    confirmRemindMeDialog: function () {
      this.$refs.remindMeDialog.close();
    },
    cancelRemindMeDialog: function () {
      this.$refs.remindMeDialog.close();
    },
    confirmCustomDialog: function () {
      this.$refs.customDialog.close();
    },
    cancelCustomDialog: function () {
      this.$refs.customDialog.close();
    },
    executeCustomOptions: function (option) {
      switch (option?.id) {
        case createTasksOptionsIds.PICK_A_DATE:
          this.lastDialogOption = createTasksOptionsIds.PICK_A_DATE;
          this.$refs.dueDateDialog.open();
          break;
        case createTasksOptionsIds.PICK_A_DATE_AND_TIME:
          this.lastDialogOption = createTasksOptionsIds.PICK_A_DATE_AND_TIME;
          this.$refs.remindMeDialog.open();
          break;
        case createTasksOptionsIds.CUSTOM:
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
