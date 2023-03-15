<template>
  <div>
    <q-tabs v-if="isDateTime" v-model="dateTimeSelected" >
      <q-tab
        name="date"
        class="row justify-center items-center col-grow"
        @click="selectDate"
      >
        <span v-html="$t('DATE')" class="text-bold text-caption" />
      </q-tab>
      <q-tab
        name="time"
        class="row justify-center items-center col-grow"
        @click="selectTime"
      >
        <span v-html="$t('TIME')" class="text-bold text-caption" />
      </q-tab>
    </q-tabs>
    <q-carousel
      v-model="dateTimeSelected"
      animated
      navigation
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide
        v-if="_date"
        name="date"
        class="q-pa-none"
      >
        <q-date
          v-model="date"
          square
          flat
        />
      </q-carousel-slide>
      <q-carousel-slide
        v-if="_time"
        name="time"
        class="q-pa-none"
      >
        <q-time
          v-model="time"
          square
          flat
        />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { date } from 'quasar'
import { sleep } from 'src/utils'

export default {
  name: 'CDateTime',
  props: {
    modelValue: {
      type: Object,
    },
    _date: {
      type: Boolean,
    },
    _time: {
      type: Boolean,
    }
  },
  watch: {
    date: async function () {
      if (this.isDateTime) {
        await sleep(300);
        this.selectTime();
      } else {
        this.updateModel();
      }
    },
    time: function () {
      this.updateModel();
    }
  },
  data: function () {
    return {
      date: this.getCurrentFormattedDate(),
      time: this.getCurrentFormattedTime(),
      dateTimeSelected: this.getDefaultTabSelected(),
      pickTime: null,
    };
  },
  computed: {
    isDateTime: function () {
      return this._date && this._time;
    },
  },
  methods: {
    getCurrentFormattedDate: function () {
      return date.formatDate(new Date(), "YYYY/MM/DD");
    },
    getCurrentFormattedTime: function () {
      return date.formatDate(new Date(), "HH:mm");
    },
    getDefaultTabSelected: function () {
      if (this.isDateTime) {
        return 'date'
      }

      if (this._date) {
        return 'date'
      }

      if (this._time) {
        return 'time'
      }
    },
    updateModel: function () {
      let value;

      if (this.isDateTime) {
        value = `${this.date} ${this.time}`;
      }

      if (this._date) {
        value = this.date;
      }

      if (this._time) {
        value = this.time;
      }

      const newModelValue = { ...this.modelValue, dialog: { value: value } }

      this.$emit('update:modelValue', newModelValue);
    },
    selectDate: function () {
      this.dateTimeSelected = "date";
    },
    selectTime: function () {
      this.dateTimeSelected = "time";
    },
  }
}
</script>

<style>

</style>