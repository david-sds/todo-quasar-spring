<template>
  <q-item class="task-card">
    <q-checkbox
      v-model="done"
      checked-icon="mdi-check-circle-outline"
      unchecked-icon="mdi-circle-outline"
      @click="updateDone"
    />
    <q-item-section style="cursor: pointer" @click="openTaskDetailsDialog">
      <div>
        <span :style="titleStyle">{{ _title }}</span>
      </div>
      <div>
        <div v-if="_group">
          <span v-html="_group" class="neutral-primary-medium" />
          <q-icon
            name="circle"
            size="6px"
            class="q-mx-xs neutral-primary-medium"
          />
        </div>
        <q-icon name="today" color="black" />
        <span>{{ _day }}</span>
        <q-icon v-if="_reccurency" name="mdi-autorenew" color="black" />
      </div>
    </q-item-section>
    <q-checkbox
      v-model="favorited"
      checked-icon="mdi-star"
      unchecked-icon="mdi-star-outline"
    />
  </q-item>
</template>

<script>
export default {
  name: "Task",
  props: {
    _done: {
      required: true,
      type: Boolean,
    },
    _title: {
      required: true,
      type: String,
    },
    _group: {
      required: true,
      type: String,
    },
    _day: {
      required: true,
      type: String,
    },
    _reccurency: {
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
      done: this._done,
      favorited: this._favorited,
    };
  },
  computed: {
    titleStyle: function () {
      return this.done ? 'text-decoration: line-through;' : '';
    },
  },
  methods: {
    updateDone: function () {
      this.$emit('updateDone', this.done);
    },
    openTaskDetailsDialog: function () {
      this.$emit('openTaskDetailsDialog')
    },
  },
}
</script>

<style lang="scss">
.task-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: space-between;
}

.neutral-primary-medium {
  color: $neutral-primary-medium;
}
</style>