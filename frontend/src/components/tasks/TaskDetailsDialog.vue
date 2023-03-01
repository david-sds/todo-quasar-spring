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
          <span>{{  $t('MY_DAY') }} </span>
        </q-btn>
      </q-card-section>
      <q-card-section class="row justify-left items-center q-pa-none">
        <q-checkbox
          v-model="done"
          checked-icon="mdi-check-circle-outline"
          unchecked-icon="mdi-circle-outline"
          size="xl"
          @click="updateDone"
        />
        <span class="text-h5">{{ _title }}</span>
        <q-space />
        <q-checkbox
          v-model="favorited"
          checked-icon="mdi-star"
          unchecked-icon="mdi-star-outline"
          size="lg"
          class="self-end"
        />
      </q-card-section>
      <q-card-section class="col-grow">
        <TaskSteps />

        <div
          class="row justify-start items-center q-pa-none"
        >
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

        <div
          class="row justify-start items-center q-pa-none"
        >
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

        <div
          class="row justify-start items-center q-pa-none"
        >
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

        <div
          class="row justify-start items-center q-pa-none"
        >
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

        <div
          class="row justify-start items-center q-pa-none"
        >
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
import TaskSteps from 'src/components/tasks/TaskSteps.vue'
import CConfirmDialog from 'src/components/core/CConfirmDialog.vue'

export default {
  name: "TaskDetailsDialog",
  components: {
    TaskSteps: TaskSteps,
    CConfirmDialog: CConfirmDialog,
  },
  props: {
    _title: {
      required: true,
      type: String,
      default: '',
    },
    _done: {
      required: true,
      type: Boolean,
      default: false,
    },
    _favorited: {
      required: true,
      type: Boolean,
      default: false,
    },
    _createdAt: {
      required: true,
      type: String,
      default: '',
    }
  },
  data: function () {
    return {
      isOpen: true,
      done: !!this._done,
      favorited: !!this._favorited,
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
    updateDone: function () {
      this.$emit('updateDone', this.done);
    },
    deleteTask: function () {
      this.closeConfirmDeleteDialog();
    },
    open: async function () {
      this.isOpen = true;
    },
    close: function () {
      this.isOpen = false;
    },
    openConfirmDeleteDialog: async function () {
      this.$refs.confirmDeleteDialog.open();
    },
    closeConfirmDeleteDialog: function () {
      this.$refs.confirmDeleteDialog.close();
    },
  },
}
</script>

<style>
</style>