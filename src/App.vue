<template>
  <div class="hotel-filter">
    <component
      v-for="component in $store.state.items"
      v-bind="component"
      :key="component.type"
      :is="getComponentName(component.type)"
    ></component>
    <app-button></app-button>
  </div>
</template>

<script>
import AppCalendar from './components/AppCalendar.vue';
import AppPeriod from './components/AppPeriod.vue';
import AppMeal from './components/AppMeal.vue';
import AppRoom from './components/AppRoom.vue';
import AppButton from './components/AppButton.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    getComponentName(componentType) {
      return `App${componentType
        .substring(0, 1)
        .toUpperCase()}${componentType.substring(1)}`;
    },
  },
  components: {
    AppCalendar,
    AppPeriod,
    AppMeal,
    AppRoom,
    AppButton,
  },
  beforeMount() {
    //set calendar index
    this.$store.state.calendarItemIndex = this.$store.state.items.findIndex(
      (item) => item.type === 'calendar'
    );
    //set period index
    this.$store.state.periodItemIndex = this.$store.state.items.findIndex(
      (item) => item.type === 'period'
    );
  },
  mounted() {
    //click on the document to close lists
    document.addEventListener('click', (e) => {
      if (e.target.closest('.hotel-filter__item')) {
        return false;
      } else {
        this.$store.state.opened = '';
      }
    });
  },
};
</script>

<style>
#hotelFilter {
  font-family: 'Roboto', sans-serif;
}
.hotel-filter {
  margin: 30px 0;
}
.hotel-filter__item {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 10px;
  position: relative;
}
.hotel-filter__title {
  font-size: 10px;
  font-family: Roboto, Arial, sans-serif;
  color: #9797aa;
  text-transform: uppercase;
  margin-bottom: 5px;
  line-height: normal;
}
.hotel-filter__text {
  font-size: 18px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 500;
  color: #0f2777;
  cursor: pointer;
}
.hotel-filter__chooser {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 5px 5px 20px #0000000d;
  width: 100%;
  position: absolute;
  top: calc(100% + 0px);
  left: 0;
  box-sizing: border-box;
  z-index: 9;
}
a.hotel-filter__chooser__item {
  font-size: 18px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 500;
  color: #0f2777;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  transition: opacity 0.5s ease;
  -webkit-transition: opacity 0.5s ease;
}
a.hotel-filter__chooser__item:hover {
  opacity: 0.7;
}
a.hotel-filter__chooser__item:last-of-type {
  margin-bottom: 0;
}
@media (min-width: 992px) {
  .hotel-filter {
    box-sizing: border-box;
    min-height: 120px;
    background-color: #fff;
    box-shadow: 5px 5px 20px #2626260d;
    border-radius: 10px;
    display: flex;
    padding: 30px;
    align-items: stretch;
    justify-content: space-between;
    margin: -60px 0 45px;
    position: relative;
    z-index: 9;
  }
  .hotel-filter__item {
    max-width: 250px;
    margin-right: 50px;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    margin-bottom: 0;
  }
  .hotel-filter__chooser {
    left: -30px;
    min-width: 215px;
  }
}

/*Transitions*/
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
</style>
