<template>
  <div class="hotel-filter__button">
    <div class="b-button" @click="click">
      {{
        roomsAreAvailable
          ? $store.state.button.send
          : $store.state.button.scroll
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  data() {
    return {};
  },
  computed: {
    roomsAreAvailable() {
      return !this.$store.state.items.find(
        (item) => item.data.length && item.data.find((d) => !d.id)
      );
    },
  },
  methods: {
    click() {
      this.setUrl();
      this.send();
    },
    setUrl() {
      const queryObject = {};
      this.$store.state.items.forEach((item) => {
        let selected;
        switch (item.type) {
          case 'calendar':
            queryObject.START = new Date(item.data.range.start).getTime();
            queryObject.END = new Date(item.data.range.end).getTime();
            break;
          case 'period':
            break;
          default:
            selected = item.data.find((obj) => obj.selected);
            selected = selected ? selected : item.data[0];
            queryObject[item.param] = selected.id;
        }
      });

      //get query
      let result = [];
      let k;
      for (k in queryObject) {
        result.push(k + '=' + queryObject[k]);
      }
      result = '?' + result.join('&');

      history.replaceState({}, '', result);
    },
    changeHotelRooms(html) {
      if (!document.querySelector('.b-hotel-rooms')) {
        return;
      }
      //dropdown
      document.querySelector(
        '.b-hotel-rooms h3 span'
      ).textContent = `${this.$store.getters.headingString}`;

      //swiper
      const div = document.querySelector('.b-hotel-rooms .swiper-container');
      div.innerHTML = html;

      //swiper
      if (!window.Swiper) return;
      window.hotelRoomsSwiper = new window.Swiper(
        '.b-hotel-rooms .swiper-container',
        {
          slidesPerView: 1.1,
          freeMode: true,
          spaceBetween: 10,
          navigation: {
            nextEl: '#roomsSwiperNext',
            prevEl: '#roomsSwiperPrev',
          },
          breakpoints: {
            1400: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            1200: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            992: {
              spaceBetween: 30,
              slidesPerView: 2.2,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 1.8,
            },
            576: {
              spaceBetween: 30,
              slidesPerView: 1.5,
            },
          },
        }
      );

      //scroll
      setTimeout(() => {
        if (
          this.roomsAreAvailable &&
          document.querySelector('.b-hotel-rooms')
        ) {
          window.scrollTo({
            top:
              document.querySelector('.b-hotel-rooms').getBoundingClientRect()
                .top + window.scrollY,
            behavior: 'smooth',
          });
        } else if (document.getElementById('sendMessage')) {
          window.scrollTo({
            top:
              document.getElementById('sendMessage').getBoundingClientRect()
                .top +
              window.scrollY -
              100,
            behavior: 'smooth',
          });
        }
      }, 500);
    },
    changeTable(html) {
      if (document.getElementById('hotelTable')) {
        document.getElementById('hotelTable').innerHTML = html;
      }
    },
    async send() {
      let result;
      let response;
      const formData = this.$store.getters.formData;
      //fetch
      response = await fetch(
        `${this.$store.state.fetchUrl.hotelRoomsGallery}&${formData}`,
        {
          method: 'GET',
        }
      );

      result = await response.json();
      //destroy gallery
      if (window.hotelRoomsSwiper && window.hotelRoomsSwiper.destroy) {
        window.hotelRoomsSwiper.destroy();
      }
      if (
        typeof result === 'object' &&
        result.STATUS &&
        result.STATUS === 'Y'
      ) {
        this.changeTable(result.HTML.table);
        this.changeHotelRooms(result.HTML.gallery);
      }
    },
  },
};
</script>

<style scoped>
.hotel-filter__button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.b-button {
  display: inline-block;
  line-height: 48px;
  font-size: 14px;
  color: #fff;
  min-width: 200px;
  background-color: #ba1f2e;
  text-align: center;
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
  cursor: pointer;
  border-radius: 25px;
}

.b-button:hover {
  opacity: 0.7;
}

a.b-button,
a.b-button:hover {
  text-decoration: none;
}
@media (min-width: 992px) {
  .hotel-filter__button {
    justify-content: flex-end;
  }
}
</style>
