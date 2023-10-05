<template>
  <div class="hotel-filter__item">
    <div class="hotel-filter__title">{{ title }}</div>
    <div class="hotel-filter__text" @click="openToggle">
      {{ selected.name }}
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
  name: 'AppMeal',
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
    selected() {
      const selected = this.data.find((elem) => elem.selected);
      return selected ? selected : this.data[0];
    },
    isOpen() {
      return this.$store.state.opened === this.type;
    },
  },
  methods: {
    openToggle() {
      const state = this.$store.state.opened === this.type ? '' : this.type;
      this.$store.commit('setOpened', state);
    },
    choose(e) {
      //set selected
      this.$store.commit('setElemSelected', {
        type: this.type,
        id: e.target.getAttribute('data-id'),
      });
      //close list
      this.openToggle();
      //str
      this.$store.commit('setStr', {
        type: this.type,
        str: this.selected.name,
      });
    },
  },
  mounted() {
    //str
    this.$store.commit('setStr', {
      type: this.type,
      str: this.selected.name,
    });
  },
};
</script>
