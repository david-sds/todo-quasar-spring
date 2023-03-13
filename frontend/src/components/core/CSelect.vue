<template>
  <div
    class="row justify-center items-center"
    style="height: 40px;"
  >
    <q-btn
      v-if="!isSelectedOption"
      no-caps
      no-wrap
      flat
      no-icon-animation
      class="c-options"
    >
      <q-icon
        v-if="_buttonIcon"
        :name="_buttonIcon"
        size="xs"
        class="q-mr-xs"
      />
      <span
        v-if="_buttonLabel"
        v-html="_buttonLabel"
        class="q-m-sm"
      />
      <CMenu
        :value="modelValue"
        :_options="_options"
        @input="selectOption"
      />
    </q-btn>
    <q-badge
      v-else
      rounded
      color="blue"
      class="badge-round-borders q-py-xs q-px-sm q-mr-sm"
    >
      <q-icon
        v-if="selectedOption.icon"
        :name="selectedOption.icon"
        size="xs"
      />
      <span
        v-html="$t('DUE_X', { x: selectedOption.name })"
        class="text-subtitle2 q-mx-sm"
      />
      <q-icon
        name="mdi-close-circle"
        size="xs"
        @click="selectedOption = null"
      />
    </q-badge>
  </div>
</template>

<script>
import CMenu from 'src/components/core/CMenu.vue'

export default {
  name: "CSelect",
  components: {
    CMenu: CMenu,
  },
  props: {
    modelValue: {
      type: Object,
    },
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
      default: '',
    },
  },
  data: function () {
    return {
      selectedOption: null,
    };
  },
  computed: {
    isSelectedOption: function () {
      return this.selectedOption instanceof Object && !this.selectedOption.complex;
    },
  },
  methods: {
    selectOption: function (input) {
      this.selectedOption = input;
      this.$emit('update:modelValue', input);
    },
  },
}
</script>

<style scope>
.badge-round-borders {
  border-radius: 32px;
}

.c-options .q-btn-dropdown__arrow-container {
  display: none;
}

</style>