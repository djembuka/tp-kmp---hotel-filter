import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

const store = createStore({
  state() {
    return {
      opened: '',
      ...window.hotelFilterStore,
    };
  },
  mutations: {
    setRangeEnd(state, payload) {
      const range = state.items[state.calendarItemIndex].data.range;
      const end = new Date(
        new Date(range.start).getTime() + payload * 24 * 60 * 60 * 1000
      );
      range.end = end;
    },
    setElemSelected(state, payload) {
      const item = state.items.find((item) => item.type === payload.type);
      const selected = item.data.find((elem) => elem.selected);
      if (selected) {
        selected.selected = undefined;
      }
      item.data.find((elem) => elem.id === payload.id).selected = true;
    },
    setOpened(state, payload) {
      state.opened = payload;
    },
    createPeriodNames(state) {
      const days = state.days;
      state.items[state.periodItemIndex].data.forEach((i) => {
        if (!i.days) {
          return;
        }
        let nights;
        if (/(10|11|12|13|14|15|16|17|18|19)$/.test(i.days)) {
          nights = days[2];
        } else if (/.*1$/.test(i.days)) {
          nights = days[0];
        } else if (/[2-4]$/.test(i.days)) {
          nights = days[1];
        } else {
          nights = days[2];
        }
        i.name = `${i.days} ${nights}`;
      });
    },
    setLoadFlag(state, payload) {
      state.loadFlag = payload;
    },
    setStr(state, payload) {
      state.items.find((item) => item.type === payload.type).str = payload.str;
    },
  },
  getters: {
    headingString(state) {
      let str = '';
      state.items.forEach((item, index) => {
        str += item.str;
        if (index < state.items.length - 1) {
          str += ', ';
        }
      });

      return str;
    },
    formData(state) {
      const formData = {};
      state.items.forEach((item) => {
        let selected;
        switch (item.type) {
          case 'calendar':
            formData.START = new Date(item.data.range.start).getTime();
            formData.END = new Date(item.data.range.end).getTime();
            break;
          case 'period':
            break;
          default:
            selected = item.data.find((obj) => obj.selected);
            selected = selected ? selected : item.data[0];
            formData[item.param] = selected.id;
        }
      });
      const formDataArr = [];
      let k;
      for (k in formData) {
        formDataArr.push(k + '=' + formData[k]);
      }

      return formDataArr.join('&');
    },
  },
  actions: {
    async getFilterData({ commit, state, getters }) {
      if (!state.loadFlag) {
        commit('setLoadFlag', true);
        return;
      }
      const response = await fetch(
        `${state.fetchUrl.filterData}&${getters.formData}`,
        {
          method: 'GET',
        }
      );
      const storeData = await response.json();
      commit('setLoadFlag', false); //prevent from fetching endlessly, because of computed prop
      storeData.items.forEach((item) => {
        state.items.find((i) => i.type === item.type).data = item.data;
      });
      commit('createPeriodNames');
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount('#hotelFilter');
