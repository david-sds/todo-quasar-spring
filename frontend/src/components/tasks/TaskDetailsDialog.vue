<template>
  <q-dialog
    v-model="isOpen"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card class="column no-wrap">
      <q-card-section class="q-pa-none">
        <q-btn
          flat
          no-caps
          class="q-py-lg"
          @click="close"
        >
          <q-icon name="mdi-arrow-left" class="q-mx-md" />
          <span v-html="$t('MY_DAY')" />
        </q-btn>
      </q-card-section>
      <q-card-section class="row justify-left items-center q-pa-none">
        <q-checkbox
          v-model="task.done"
          checked-icon="mdi-check-circle-outline"
          unchecked-icon="mdi-circle-outline"
          size="xl"
          @click="updateTask"
        />
        <span v-html="_title" class="text-h5" />
        <q-space />
        <q-checkbox
          v-model="task.favorite"
          checked-icon="mdi-star"
          unchecked-icon="mdi-star-outline"
          size="lg"
          class="self-end"
          @click="updateTask"
        />
      </q-card-section>
      <q-card-section class="col-grow">
        <TaskSteps />

        <div class="row justify-start items-center q-pa-none" >
          <q-icon
            name="mdi-weather-sunny"
            size="sm"
            class="q-ma-sm"
            color="darkgrey"
          />
          <q-input
            :label="$t('ADDED_TO_MY_DAY')"
            borderless
            class="col-grow"
          />
        </div>

        <div class="row justify-start items-center q-pa-none" >
          <q-icon
            name="mdi-bell-outline"
            size="sm"
            class="q-ma-sm"
            color="darkgrey"
          />
          <q-input
            :label="$t('REMIND_ME')"
            class="col-grow"
          />
        </div>

        <div class="row justify-start items-center q-pa-none" >
          <q-icon
            name="mdi-calendar"
            size="sm"
            class="q-ma-sm"
            color="darkgrey"
          />
          <q-input
            :label="$t('DUE_TODAY')"
            class="col-grow"
          />
        </div>

        <div class="row justify-start items-center q-pa-none" >
          <q-icon
            name="mdi-autorenew"
            size="sm"
            class="q-ma-sm"
            color="darkgrey"
          />
          <q-input
            :label="$t('DAILY')"
            borderless
            class="col-grow"
          />
        </div>

        <div class="row justify-start items-center q-pa-none" >
          <q-icon
            name="mdi-attachment"
            size="sm"
            class="q-ma-sm"
            color="darkgrey"
          />
          <q-input
            :label="$t('ADD_FILE')"
            borderless
            class="col-grow"
          />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row justify-between items-center">
        <span v-html="`${$t('CREATED_ON')} ${createdAt}`" />
        <q-btn
          round
          flat
          icon="mdi-trash-can-outline"
          @click="openConfirmDeleteDialog"
        />
      </q-card-section>
    </q-card>
    <CConfirmDialog
      ref="confirmDeleteDialog"
      :_title="$t('ARE_YOU_SURE_?')"
      :_subtitle="confirmDeleteSubtitle"
      :_cancel="$t('CANCEL')"
      :_confirm="$t('DELETE')"
      _confirmColor="red"
      @cancel="closeConfirmDeleteDialog"
      @confirm="deleteTask"
    />
  </q-dialog>
</template>

<script>
import { date } from 'quasar'
import { saveTask, deleteTask } from 'src/requests/tasks'
import TaskSteps from 'src/components/tasks/TaskSteps.vue'
import CConfirmDialog from 'src/components/core/CConfirmDialog.vue'

export default {
  name: "TaskDetailsDialog",
  components: {
    TaskSteps: TaskSteps,
    CConfirmDialog: CConfirmDialog,
  },
  props: {
    _id: {
      required: true,
      type: Number,
    },
    _title: {
      required: true,
      type: String,
    },
    _done: {
      required: true,
      type: Boolean,
    },
    _favorite: {
      required: true,
      type: Boolean,
    },
    _createdAt: {
      required: true,
      type: String,
    }
  },
  data: function () {
    return {
      isOpen: false,
      task: {},
    };
  },
  computed: {
    createdAt: function () {
      const createdAt = new Date(this._createdAt);
      return date.formatDate(createdAt, 'ddd, MMM DD, YYYY')
    },
    confirmDeleteSubtitle: function () {
      return `"${this._title}'" ${this.$t('WILL_BE_PERMANENTLY_DELETED')}`;
    }
  },
  methods: {
    load: function () {
      this.task = {
        id: this._id,
        done: !!this._done,
        favorite: !!this._favorite,
      }
    },
    updateTask: async function () {
      this.$emit('updated', this.task);
    },
    deleteTask: async function () {
      await deleteTask(this._id)

      this.closeConfirmDeleteDialog();
      this.close();
    },
    openConfirmDeleteDialog: async function () {
      this.$refs.confirmDeleteDialog.open();
    },
    closeConfirmDeleteDialog: function () {
      this.$refs.confirmDeleteDialog.close();
    },
    open: function () {
      this.load();

      this.isOpen = true;
    },
    close: function () {
      this.$emit('reload')

      this.isOpen = false;
    },
  },
}
</script>

<style>
</style>