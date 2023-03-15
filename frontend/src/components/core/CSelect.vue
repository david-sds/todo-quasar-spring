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
        v-if="modelValue.icon"
        :name="modelValue.icon"
        size="xs"
      />
      <span
        v-html="selectedOptionLabel"
        class="text-subtitle2 q-mx-sm"
      />
      <q-icon
        name="mdi-close-circle"
        size="xs"
        @click="selectOption(null)"
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
      default: null,
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
  computed: {
    isSelectedOption: function () {
      if (!this.modelValue?.dialog) {
        return this.modelValue instanceof Object;
      }

      return !!this.modelValue.dialog?.value;
    },
    selectedOptionLabel: function () {
      if (!this.modelValue?.dialog) {
        return this.$t('DUE_X', { x: this.modelValue.name });
      }
      
      return this.$t('DUE_X', { x: this.modelValue.dialog?.value })
    },
  },
  methods: {
    selectOption: function (input) {
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