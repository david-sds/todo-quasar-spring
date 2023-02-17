<template>
  <q-dialog
    v-model="isOpen"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
  >
    <q-card class="q-pa-sm">
      <q-card-section>
        <q-btn flat no-caps @click="close">
          <q-icon name="mdi-arrow-left" />
          <span>{{  $t('MY_DAY') }} </span>
        </q-btn>
      </q-card-section>
      <q-card-section class="row justify-left items-center">
        <q-checkbox
          v-model="done"
          checked-icon="mdi-check-circle-outline"
          unchecked-icon="mdi-circle-outline"
          @click="updateDone"
        />
        <span>{{ _title }}</span>
        <q-space />
        <q-checkbox
          v-model="favorited"
          checked-icon="mdi-star"
          unchecked-icon="mdi-star-outline"
          class="self-end"
        />
      </q-card-section>
      <q-card-section>
        <q-input borderless :label="$t('APP_STEP')">
          <template v-slot:prepend>
            <q-icon name="mdi-plus" size="18px" />
          </template>
        </q-input>

        <q-input borderless :label="$t('ADDED_TO_MY_DAY')">
          <template v-slot:prepend>
            <q-icon name="mdi-weather-sunny" size="18px" />
          </template>
        </q-input>

        <q-input borderless :label="$t('REMIND_ME')">
          <template v-slot:prepend>
            <q-icon name="mdi-bell-outline" size="18px" />
          </template>
        </q-input>

        <q-input borderless :label="$t('DUE_TODAY')">
          <template v-slot:prepend>
            <q-icon name="mdi-calendar" size="18px" />
          </template>
        </q-input>

        <q-input borderless :label="$t('DAILY')">
          <template v-slot:prepend>
            <q-icon name="mdi-autorenew" size="18px" />
          </template>
        </q-input>

        <q-input borderless :label="$t('ADD_FILE')">
          <template v-slot:prepend>
            <q-icon name="mdi-attachment" size="18px" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "TaskDetailsDialog",
  props: {
    _title: {
      required: true,
      type: String,
    },
    _done: {
      required: true,
      type: Boolean,
    },
    _favorited: {
      required: true,
      type: Boolean,
    },
  },
  data: function () {
    return {
      done: !!this._done,
      favorited: !!this._favorited,
      isOpen: false,
    };
  },
  methods: {
    open: async function () {
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