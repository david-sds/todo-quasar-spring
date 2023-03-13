<template>
  <q-menu>
    <q-item
      v-for="option in _options"
      :key="option.id"
      clickable
      v-close-popup
      class="row justify-start items-center"
      @click="selectOption(option)"
    >
      <q-icon
        v-if="option.icon"
        :name="option.icon"
        size="xs"
        class="q-mr-sm"
      />
      <q-item-label>{{ option.name }}</q-item-label>
    </q-item>
  </q-menu>
</template>

<script>
export default {
  name: "CMenu",
  props: {
    _options: {
      type: Array,
      default: () => ([])
    },
  },
  methods: {
    selectOption: function (option) {
      this.$emit('input', option);
    }
  }
}
</script>

<style scope>
.c-options .q-btn-dropdown__arrow-container {
  display: none;
}

</style>