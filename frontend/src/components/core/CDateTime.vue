<template>
  <div>
    <q-tabs v-if="_date && _time" >
      <q-tab
        :label="$t('DATE')"
        class="col-grow"
        @click="dateTimeSelected = 1"
      />
      <q-tab
        :label="$t('TIME')"
        class="col-grow"
        @click="dateTimeSelected = 2"
      />
    </q-tabs>
    <q-carousel
      v-model="dateTimeSelected"
      animated
      navigation
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide
        :name="1"
        class="q-pa-none"
      >
        <q-date
          v-model="date"
          flat
        />
      </q-carousel-slide>
      <q-carousel-slide
        :name="2"
        class="q-pa-none"
      >
        <q-time
          v-model="time"
          flat
        />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'CDateTime',
  props: {
    modelValue: {
      type: String,
    },
    _date: {
      type: Boolean,
    },
    _time: {
      type: Boolean,
    }
  },
  data: function () {
    return {
      date: this.getCurrentFormattedDate(),
      time: this.getCurrentFormattedTime(),
      dateTimeSelected: 1,
      pickTime: null,
    };
  },
  methods: {
    getCurrentFormattedDate: function () {
      return date.formatDate(new Date(), "YYYY/MM/DD");
    },
    getCurrentFormattedTime: function () {
      return date.formatDate(new Date(), "HH:mm");
    },
  }
}
</script>

<style>

</style>