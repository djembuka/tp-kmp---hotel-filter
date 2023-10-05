<template>
  <div class="hotel-filter__item">
    <div class="hotel-filter__title">{{ title }}</div>
    <div class="hotel-filter__text" @click="openToggle">
      {{ checkInDate }}
    </div>
    <transition name="fade">
      <date-picker
        :locale="{ firstDayOfWeek: 2, masks: { weekdays: 'WW' } }"
        :update-on-input="true"
        :columns="2"
        title-position="left"
        v-if="isOpen"
        v-model="$store.state.items[$store.state.calendarItemIndex].data.range"
        @input="window.alert('asd')"
        is-range
        v-bind="dates"
      ></date-picker>
    </transition>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';

export default {
  name: 'AppCalendar',
  data() {
    return {
      dates: {
        'available-dates': this.data.availableDates,
        'min-date': this.data.minDate,
      },
      months: [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ],
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
  },
  props: {
    id: [String, Number],
    type: String,
    title: String,
    data: [Array, Object],
  },
  computed: {
    isOpen() {
      return this.$store.state.opened === this.type;
    },
    checkInDate() {
      //date
      const i = this.$store.state.calendarItemIndex;
      let date = new Date(
        this.$store.state.items[i].data.range.start
      ).getDate();
      let month = new Date(
        this.$store.state.items[i].data.range.start
      ).getMonth();
      let day = new Date(this.$store.state.items[i].data.range.start).getDay();
      //fetch
      this.$store.dispatch('getFilterData');
      //end date
      let end = this.$store.state.items[i].data.range.end;
      date + end - end; //fake
      //str
      let str = `${date} ${this.months[month]} ${this.days[day]}`;
      this.$store.commit('setStr', { type: this.type, str });
      return str;
    },
  },
  methods: {
    openToggle() {
      const state = this.$store.state.opened === this.type ? '' : this.type;
      this.$store.commit('setOpened', state);
    },
  },
  components: {
    DatePicker,
  },
};
</script>

<style>
.hotel-filter__item .vc-container {
  position: absolute;
  top: 100%;
  left: 0;
  border-color: transparent;
  box-shadow: 5px 5px 20px #0000000d;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  z-index: 10;
}
.hotel-filter__item .vc-arrows-container.title-left {
  display: block;
  padding: 0;
}
.hotel-filter__item .vc-arrow {
  position: absolute;
  top: calc((538px - 32px) / 2);
  box-shadow: 0px 3px 6px #0000001a;
  background-color: #ffffff;
  border-width: 3px;
  z-index: 10;
}
.hotel-filter__item .vc-arrow.is-left {
  left: -16px;
}
.hotel-filter__item .vc-arrow.is-right {
  right: -16px;
}
.hotel-filter__item .in-transition .vc-arrow {
  opacity: 0;
}
.hotel-filter__item .vc-weekday {
  font-size: 10px;
  font-weight: 500;
  color: #9797aa;
  text-transform: capitalize;
}
.hotel-filter__item .vc-weeks {
  min-width: 100% !important;
  width: 100% !important;
}
.hotel-filter__item .vc-svg-icon path {
  fill: #172877;
}
.hotel-filter__item .vc-header {
  padding-right: 38px;
  padding-left: 38px;
}
.hotel-filter__item .vc-title {
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  color: #0f2777;
}
.hotel-filter__item .vc-pane-layout {
  display: block;
}
.hotel-filter__item .vc-day-layer {
  top: -1px;
}
.hotel-filter__item .vc-day-content {
  font-weight: 500 !important;
}
.hotel-filter__item .vc-day-content.is-disabled {
  pointer-events: none;
}
.hotel-filter__item .vc-day-content:hover,
.hotel-filter__item .vc-day-content:focus {
  background-color: transparent !important;
  color: #0f2777;
}
.hotel-filter__item .vc-highlights + .vc-day-content:focus,
.hotel-filter__item .vc-day:hover .vc-highlights + .vc-day-content {
  color: #fff !important;
}
.hotel-filter__item .vc-highlight {
  border-width: 0 !important;
  border-radius: 0 !important;
  background-color: #0f2777 !important;
  border-color: #0f2777 !important;
  height: 32px;
}
.hotel-filter__item .vc-highlight.vc-highlight-base-middle,
.hotel-filter__item .vc-highlight.vc-highlight-base-start,
.hotel-filter__item .vc-highlight.vc-highlight-base-end {
  opacity: 0.3 !important;
}

@media (min-width: 992px) {
  .hotel-filter__item .vc-container {
    top: calc(100% + 30px);
    left: -30px;
  }
}
@media (min-width: 576px) {
  .hotel-filter__item .vc-container {
    width: max-content;
  }
  .hotel-filter__item .vc-pane-layout {
    display: grid;
  }
  .hotel-filter__item .vc-weeks {
    min-width: 236px !important;
    width: 236px !important;
  }
  .hotel-filter__item .vc-arrow {
    top: calc((268px - 32px) / 2);
  }
  .hotel-filter__item .vc-highlight {
    width: 32px;
  }
}
</style>
