<template>
  <div class="hotel-filter__item">
    <div class="hotel-filter__title">{{ title }}</div>
    <div class="hotel-filter__text" @click="openToggle">
      {{ nights }}
    </div>
    <transition name="fade"
      ><div v-if="isOpen" class="hotel-filter__chooser">
        <a
          href=""
          v-for="item in data"
          :data-id="item.id"
          :key="item.id"
          @click.prevent="choose($event)"
          class="hotel-filter__chooser__item"
          >{{ item.name }}</a
        >
      </div></transition
    >
  </div>
</template>

<script>
export default {
  name: 'AppPeriod',
  data() {
    return {};
  },
  props: {
    id: [String, Number],
    type: String,
    title: String,
    data: [Array, Object],
  },
  computed: {
    nights() {
      const i = this.$store.state.calendarItemIndex;
      const num = Math.floor(
        (this.$store.state.items[i].data.range.end -
          this.$store.state.items[i].data.range.start) /
          24 /
          60 /
          60 /
          1000
      );
      //str
      const str = `${num} ${this.getNights(num)}`;
      this.$store.commit('setStr', { type: this.type, str });
      return str;
    },
    isOpen() {
      return this.$store.state.opened === this.type;
    },
  },
  methods: {
    getNights(num) {
      const days = this.$store.state.days;
      if (/(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {
        return days[2];
      } else if (/.*1$/.test(num)) {
        return days[0];
      } else if (/[2-4]$/.test(num)) {
        return days[1];
      } else {
        return days[2];
      }
    },
    openToggle() {
      const state = this.$store.state.opened === this.type ? '' : this.type;
      this.$store.commit('setOpened', state);
    },
    choose(e) {
      //set range end
      if (e.target.getAttribute('data-id')) {
        this.$store.commit(
          'setRangeEnd',
          this.data.find((item) => item.id === e.target.getAttribute('data-id'))
            .days
        );
      }
      //close list
      this.openToggle();
    },
  },
  beforeCreate() {
    this.$store.commit('createPeriodNames');
  },
  mounted() {
    //str
    this.$store.commit('setStr', { type: this.type, str: this.nights });
  },
};
</script>
