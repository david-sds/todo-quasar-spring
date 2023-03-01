<template>
  <q-card flat>
    <q-card-section
      v-for="step in steps"
      :key="step.id"
      class="row justify-start items-center q-pa-none"
    >
      <q-checkbox
        v-model="step.done"
        checked-icon="mdi-check-circle-outline"
        unchecked-icon="mdi-circle-outline"
        size="40px"
      />
      <q-input
        v-model="step.name"
        class="col-grow"
      >
        <template v-slot:append>
          <COptions
            :_options="stepOptions"
            @promote="promoteStep(step)"
            @delete="deleteStep(step)"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section
      class="row justify-start items-center q-pa-none"
    >
      <q-icon
        name="mdi-plus"
        size="sm"
        class="q-ma-sm"
        color="darkgrey"
      />
      <q-input
        ref="addStepInput"
        v-model="stepName"
        :label="addStepLabel"
        borderless
        class="col-grow"
        @keypress.enter="addStep"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import COptions from 'src/components/core/COptions.vue'

export default {
  name: 'TaskSteps',
  components: {
    COptions: COptions,
  },
  data: function () {
    return {
      steps: [],
      stepName: "",
      stepOptions: [
        {
          id: 'promote',
          icon: 'mdi-plus',
          name: 'Promote do Task',

        },
        {
          id: 'delete',
          icon: 'mdi-trash-can-outline',
          name: 'Delete',
        }
      ],
    }
  },
  computed: { 
    addStepLabel: function () {
      return this.steps.length > 0 ? this.$t('NEXT_STEP') : this.$t('ADD_STEP');
    },
  },
  methods: {
    addStep: function () {
      const step = {
        id: this.steps.length + 1,
        name: this.stepName,
        done: false,
      }

      this.steps.push(step);

      this.$refs.addStepInput.blur();

      this.stepName = "";
    },
    promoteStep: function (step) {
      console.log('promoteStep', step)
    },
    deleteStep: function (step) {
      const index = this.steps.indexOf(step);

      this.steps.splice(index, 1);
    },
  }
}
</script>

<style>

</style>