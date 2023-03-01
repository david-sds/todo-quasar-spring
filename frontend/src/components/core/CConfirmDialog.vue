<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <span
          class="text-h6"
          v-html="_title"
        />
        <br />
        <span
          class="text-subtitle1"
          v-html="_subtitle"
        />
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn
          :label="_cancel"
          flat
          @click="$emit('cancel')"
        />
        <q-btn
          :label="_confirm"
          flat
          :color="_confirmColor"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CConfirmDialog",
  props: {
    _title: {
      type: String,
      default: '',
    },
    _subtitle: {
      type: String,
      default: '',
    },
    _cancel: {
      type: String,
      default: '',
    },
    _confirm: {
      type: String,
      default: '',
    },
    _confirmColor: {
      type: String,
      default: '',
    },
  },
  data: function () {
    return {
      isOpen: false,
    };
  },
  methods: {
    open: function () {
      this.isOpen = true;
    },
    close: function () {
      this.isOpen = false;
    },
  },
}
</script>
