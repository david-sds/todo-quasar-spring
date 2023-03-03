<template>
  <q-item v-if="task.id" class="task-card">
    <q-checkbox
      v-model="task.done"
      checked-icon="mdi-check-circle-outline"
      unchecked-icon="mdi-circle-outline"
      @click="$emit('updated', task)"
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
      v-model="task.favorite"
      checked-icon="mdi-star"
      unchecked-icon="mdi-star-outline"
      @click="$emit('updated', task)"
    />
  </q-item>
</template>

<script>

export default {
  name: "Task",
  props: {
    _id: {
      type: Number,
      required: true,
    },
    _done: {
      type: Boolean,
      required: true,
    },
    _title: {
      type: String,
      required: true,
    },
    _group: {
      type: String,
      required: false,
    },
    _day: {
      type: String,
      required: false,
    },
    _reccurency: {
      type: Boolean,
      required: false,
    },
    _favorite: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      task: {
        id: this._id,
        done: !!this._done,
        favorite: !!this._favorite,
      }
    };
  },
  computed: {
    titleStyle: function () {
      return this.task.done ? 'text-decoration: line-through;' : '';
    },
  },
  methods: {
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