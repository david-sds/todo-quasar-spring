<template>
  <q-item class="task-card">
    <q-checkbox
      v-model="done"
      checked-icon="check_circle"
      unchecked-icon="radio_button_unchecked"
      @click="updateDone"
    />
    <q-item-section>
      <div>
        <span :style="done ? 'text-decoration: line-through;' : ''">{{
          _title
        }}</span>
      </div>
      <div>
        <span v-html="_group" class="neutral-primary-medium" />
        <q-icon
          name="circle"
          size="6px"
          class="q-mx-xs neutral-primary-medium"
        />
        <q-icon name="today" color="black" />
        <span>{{ _day }}</span>
        <q-icon v-if="_reccurency" name="autorenew" color="black" />
      </div>
    </q-item-section>
    <q-checkbox
      v-model="favorited"
      checked-icon="star"
      unchecked-icon="star_border"
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
  methods: {
    updateDone: function () {
      this.$emit('updateDone', this.done);
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