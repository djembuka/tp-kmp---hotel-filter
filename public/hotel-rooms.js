window.addEventListener('load', () => {
  //load scripts
  if (
    window.hotelFilterScripts &&
    typeof window.hotelFilterScripts === 'object'
  ) {
    let s;
    window.hotelFilterScripts.forEach((src) => {
      s = document.createElement('script');
      s.src = src;
      document.body.appendChild(s);
    });
  }

  //heading dropdown
  document.querySelectorAll('.b-heading-dropdown').forEach(function (dropdown) {
    var dropdownTitle = dropdown.querySelector('.b-heading-dropdown-title');
    var dropdownBody = dropdown.querySelector('.b-heading-dropdown-body');

    //open dropdown
    dropdownTitle.parentNode.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropdownBody.classList.add('i-dropdown');
    });

    //close dropdown
    document.addEventListener('click', function (e) {
      if (e.target.className.search('b-heading-dropdown-body') !== -1) {
        return;
      }
      dropdownBody.classList.remove('i-dropdown');
    });

    dropdownBody.querySelectorAll('a', 'span').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //hide dropdown
        dropdownBody.classList.remove('i-dropdown');
        //change content
        if (elem.tagName.toLowerCase() === 'a') {
          dropdownTitle.innerText = elem.textContent;
        }
        //fetch data
        (async () => {
          try {
            let response = await fetch(elem.getAttribute('href'));
            let roomsObject = (await response.json()).ROOMS;
            dropdownActions(roomsObject, dropdown);
          } catch (err) {
            throw err;
          }
        })();
      });
    });
  });

  function dropdownActions(roomsObject, dropdown) {
    dropdown
      .closest('.b-hotel-rooms')
      .querySelectorAll('.b-room-card')
      .forEach(function (roomCard) {
        roomsObject.forEach(function (roomObj) {
          if (String(roomCard.getAttribute('data-id')) === String(roomObj.id)) {
            roomCard.querySelector('.b-room-card__price b').innerText =
              roomObj.price;
            roomCard.querySelector('.b-room-card__days').innerText =
              roomObj.days;
            roomCard.querySelectorAll('input')[0].value = String(roomObj.price)
              .replace(' ', '')
              .match(/[\d\.]*/g)[0];
            roomCard.querySelectorAll('input')[1].value = String(roomObj.days)
              .replace(' ', '')
              .match(/\d*/g)[0];
          }
        });
      });
  }

  //rooms swiper
  if (document.querySelector('.b-hotel-rooms')) {
    document
      .querySelector('.b-hotel-rooms')
      .addEventListener('click', function (e) {
        if (e.target.classList.contains('b-room-card__collapsed-button')) {
          e.target.closest('.b-room-card').classList.add('b-room-card--open');
        } else if (e.target.classList.contains('b-room-card__image')) {
          e.target
            .closest('.b-room-card')
            .classList.remove('b-room-card--open');
        }
      });

    window.hotelRoomsSwiper = new Swiper('.b-hotel-rooms .swiper-container', {
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
    });
  }
});
