<template>
  <q-btn-dropdown
    :icon="_buttonIcon"
    :label="_buttonLabel"
    no-caps
    no-wrap
    flat
    no-icon-animation
    class="c-options"
  >
    <q-list>
      <q-item
        v-for="option in _options"
        :key="option.id"
        clickable
        v-close-popup
        class="row justify-start items-center"
        @click="$emit(option.id, $event)"
      >
        <q-icon
          v-if="option.icon"
          :name="option.icon"
          size="sm"
          class="q-mr-md"
        />
        <q-item-label>{{ option.name }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: "COptions",
  props: {
    _options: {
      type: Array,
      default: () => ([])
    },
    _buttonLabel: {
      type: String,
      default: '',
    },
    _buttonIcon: {
      type: String,
      default: 'mdi-dots-vertical',
    },
  },
}
</script>

<style scope>
.c-options .q-btn-dropdown__arrow-container {
  display: none;
}
</style>